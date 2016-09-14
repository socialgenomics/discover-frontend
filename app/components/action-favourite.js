import Ember from 'ember';

// This component should not be concerned about how the favourites are loaded.
// That is the role of the actions service.

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actionsService: Ember.inject.service('actions'),
  isStarred: Ember.computed('actionsService.userFavourites', function() {
    const actionsService = this.get('actionsService');
    return actionsService.actionableIsFavourite(this.model.id);
  }),
  tagName: 'a',
  classNameBindings: ['isStarred:starred'],

  click() {
    const actionsService = this.get('actionsService');
    const currentModel = this.model; //can be request or dataset
    const store = this.get('store');

    actionsService.getFavouritesByActionable(currentModel.id)
    .then(fav => {
      return Ember.RSVP.hash({
        user: store.peekRecord('user', fav.query.user_id),
        actionable: store.findRecord('actionable', currentModel.id),
        favourite: fav
      });
    })
    .then(resp => {
      if (resp.favourite.content.length === 0) {
        // --- Create new favourite ---
        let newFavourite = store.createRecord('action', {
          actionableId: resp.actionable,
          userId: resp.user,
          type: 'favourite'
        });
        return newFavourite.save();
      } else {
        // --- Delete the favourite ---
        let existingFavourite = resp.favourite.get('firstObject');
        return existingFavourite.destroyRecord();
      }
    })
    .then(savedOrDeletedFavourite => {
      //get state from currentState.stateName
      //push saved favourite into userFavourites
      //pop deleted favourite from userFavourites
      actionsService.pushFavourite(savedOrDeletedFavourite);
    })
    .catch(err => {
      Ember.Logger.error(err);
    });

    // if (this.get('isStarred')) {
    //   this.get('metrics').trackEvent({
    //     category: 'dataset',
    //     action: 'favourite',
    //     label: this.get('dataset.id'),
    //     value: true
    //   });
    // } else {
    //   this.get('metrics').trackEvent({
    //     category: 'dataset',
    //     action: 'favourite',
    //     label: this.get('dataset.id'),
    //     value: false
    //   });
    // }
  }
});
