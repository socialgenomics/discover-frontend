import Ember from 'ember';

export default Ember.Component.extend({
  // store: Ember.inject.service(),
  // session: Ember.inject.service(),
  actions: Ember.inject.service(),
  tagName: 'a',
  isStarred: false,

  classNameBindings: ['isStarred:starred'],
  click() {
    const actionsService = this.get('actions');
    const currentModel = this.model; //can be request or dataset
    // const currentUser = this.get('session.authenticatedUser');

    // let allFavourites = actionsService.get('allFavourites');
    let favourites = actionsService.getFavouritesByActionable(currentModel.id);


    // //TODO:
    // //All user actions will be loaded when the session starts.
    // //Check actions for favourite associated with this dataset/request.
    // //If none -> make one
    // //Else -> toggle properties.value
    //
    // //get the actions associated with currentModel
    // //load actionable for model
    //
    // store.findRecord('actionable', currentModel.id)
    // .then(actionable => {
    //   console.log(actionable);
    // })
    // .catch(err => {
    //   Ember.logger.error(err);
    // });


    // --- Create new favourite ---
    // let newFavourite = store.createRecord('action', {
    //   actionableId: resp.actionable, //needs to be actionable model
    //   userId: resp.user,
    //   type: 'favourite',
    //   properties: {
    //     value: false
    //   }
    // });
    // return newFavourite.save();


    // this.toggleProperty('isStarred');
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
