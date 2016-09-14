import Ember from 'ember';
const { inject: { service } } = Ember;
// This component should not be concerned about how the favourites are loaded.
// That is the role of the actions service.

export default Ember.Component.extend({
  store: service(),
  session: service(),
  actionsService: service('actions'),

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
    const currentUser = this.get('session.authenticatedUser');
    let favourite = actionsService.getFavourite(currentModel.id);
    if (favourite) {
      favourite.destroyRecord()
      .then(deletedFavourite => {
        console.log('Favourite Deleted');
        console.log(deletedFavourite);
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
    } else {
      store.findRecord('actionable', currentModel.id)
      .then(actionable => {
        favourite = store.createRecord('action', {
          actionableId: actionable,
          userId: currentUser,
          type: 'favourite'
        });
        return favourite.save();
      })
      .then(savedFavourite => {
        actionsService.pushFavourite(savedFavourite);
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
    }
  }
});
