import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  tagName: 'a',
  isStarred: false,
  classNameBindings: ['isStarred:starred'],
  click() {
    const userId = this.get('session.authenticatedUser');
    const currentModel = this.model;
    const currentModelActionableId = currentModel.id;
    let actionable = this.get('store').query('action', {
      actionableId: currentModelActionableId,
      type: 'favourite'
    }).then(resp => {
      return resp;
    });
    console.log(userId);
    console.log(currentModel.id);
    console.log(actionable);
    //Check if this dataset has a favourite with this userId
    //if so, check value
      //if value === false -> make true
      //else value ===true -> make false
    //else create new action with value set to true

    // let favourite = this.store.createRecord('action', {
    //   actionableId: currentModel.actionableId,
    //   userId: userId,
    //   type: 'favourite',
    //   properties: {
    //     value: true
    //   }
    // });
    // favourite.save()
    // .catch((err) => {
    //   Ember.Logger.error(err);
    // });


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
