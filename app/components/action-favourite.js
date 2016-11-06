import Ember from 'ember';
const { inject: { service }, Component, computed, isPresent, Logger } = Ember;

export default Component.extend({
  store: service(),
  session: service(),
  favouritesService: service('favourites'),

  tagName: 'a',
  isSubmitting: false,

  isStarred: computed('favouritesService.userFavourites', function() {
    return isPresent(this.get('favouritesService').getFavourite(this.get('model.id')));
  }),

  mouseEnter() {
    this.set('isHovered', true);
  },

  mouseLeave() {
    this.set('isHovered', false);
  },

  click() {
    // disable favorite functionality for not logged in users
    if (this.get('session.isAuthenticated') === false) {
      return;
    }

    const currentModel = this.model; //can be request or dataset
    const favourite = this.get('favouritesService').getFavourite(currentModel.id);

    if (!this.get('isSubmitting')) {
      if (favourite) {
        this._deleteFavourite(favourite);
      } else {
        this._addFavourite();
      }
    }
  },

  _addFavourite() {
    const currentModel = this.get('model'); //can be request or dataset
    const store = this.get('store');

    this.set('isSubmitting', true);

    store.findRecord('actionable', currentModel.id)
      .then(actionable => {
        return store.createRecord('action', {
          actionableId: actionable,
          userId: this.get('session.authenticatedUser'),
          type: 'favourite',
          actionable_model: currentModel.constructor.modelName
        }).save();
      })
      .then(savedFavourite => {
        this.get('favouritesService').pushFavourite(savedFavourite);
        this.set('isSubmitting', false);
        currentModel.incrementProperty('stats.favourite');
        this.get('metrics').trackEvent({
          category: 'dataset',
          action: 'favourite',
          label: currentModel.id,
          value: true
        });
      })
      .catch(Logger.error);
  },

  _deleteFavourite(favourite) {
    const currentModel = this.get('model');

    this.set('isSubmitting', true);

    favourite.destroyRecord()
      .then(deletedFavourite => {
        this.set('isSubmitting', false);
        currentModel.decrementProperty('stats.favourite');
        this.get('favouritesService').removeFavourite(deletedFavourite);
        this.get('metrics').trackEvent({
          category: 'dataset',
          action: 'favourite',
          label: currentModel.id,
          value: false
        });
      })
      .catch(Logger.error);
  }
});
