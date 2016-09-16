import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  comments: Ember.computed.filterBy('model.actionableId.actions', 'type', 'comment'),
  commentsSorted : Ember.computed.sort('comments', (itemA, itemB) => {
    if (itemA.get('createdAt') < itemB.get('createdAt')) {
      return 1;
    } else if (itemA.get('createdAt') > itemB.get('createdAt')) {
      return -1;
    }
    return 0;
  }),

  actions: {
    addComment(text) {
      const userId = this.get('session.authenticatedUser');
      const currentModel = this.get('model');
      let comment = this.store.createRecord('action', {
        actionableId: currentModel.actionableId,
        actionable_model: currentModel.constructor.modelName,
        userId: userId,
        type: 'comment',
        properties: {
          text: text
        }
      });
      comment.save()
      .catch((err) => {
        Ember.Logger.error(err);
      });
    }
  }
});
