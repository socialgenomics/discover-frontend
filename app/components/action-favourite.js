import Ember from 'ember';
const { inject: { service } } = Ember;

export default Ember.Component.extend({
  store: service(),
  session: service(),
  actionsService: service('actions'),
  isSubmitting: false,
  isStarred: Ember.computed('actionsService.userFavourites', function() {
    const actionsService = this.get('actionsService');
    return Ember.isPresent(actionsService.getFavourite(this.model.id));
  }),
  tagName: 'a',
  mouseEnter() {
    this.set('isHovered', true);
  },
  mouseLeave() {
    this.set('isHovered', false);
  },
  click() {
    const actionsService = this.get('actionsService');
    const currentModel = this.model; //can be request or dataset
    let favourite = actionsService.getFavourite(currentModel.id);
    if (!this.get('isSubmitting')) {
      if (favourite) {
        this._deleteFavourite(favourite);
      } else {
        this._addFavourite();
      }
    }
  },
  _addFavourite() {
    const actionsService = this.get('actionsService');
    const currentModel = this.model; //can be request or dataset
    const store = this.get('store');
    const currentUser = this.get('session.authenticatedUser');
    this.set('isSubmitting', true);
    store.findRecord('actionable', currentModel.id)
    .then(actionable => {
      let favourite = store.createRecord('action', {
        actionableId: actionable,
        userId: currentUser,
        type: 'favourite',
        actionable_model: currentModel.constructor.modelName
      });
      return favourite.save();
    })
    .then(savedFavourite => {
      actionsService.pushFavourite(savedFavourite);
      currentModel.incrementProperty('stats.favourite');
      this.set('isSubmitting', false);
      this.get('metrics').trackEvent({
        category: 'dataset',
        action: 'favourite',
        label: currentModel.id,
        value: true
      });
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  },
  _deleteFavourite(favourite) {
    const actionsService = this.get('actionsService');
    const currentModel = this.model; //can be request or dataset
    this.set('isSubmitting', true);
    favourite.destroyRecord()
    .then(deletedFavourite => {
      this.set('isSubmitting', false);
      currentModel.decrementProperty('stats.favourite');
      actionsService.removeFavourite(deletedFavourite);
      this.get('metrics').trackEvent({
        category: 'dataset',
        action: 'favourite',
        label: currentModel.id,
        value: false
      });
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  }
});
