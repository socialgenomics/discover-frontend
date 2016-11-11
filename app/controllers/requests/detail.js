import Ember from 'ember';

const { Controller, computed, inject: { service }, Logger } = Ember;

export default Controller.extend({
  session: service(),

  request: computed.alias('model.request'),
  comments: computed.filterBy('request.actionableId.actions', 'type', 'comment'),
  tags: computed.filterBy('request.actionableId.actions', 'type', 'tag'),
  commentsSorted: computed.sort('comments', (itemA, itemB) => {
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
      const currentModel = this.get('request');
      let comment = this.store.createRecord('action', {
        actionableId: currentModel.get('actionableId'),
        actionable_model: currentModel.constructor.modelName,
        userId: userId,
        type: 'comment',
        properties: {
          text: text
        }
      });
      comment.save().catch(Logger.error);
    },

    addTag(text) {
      const userId = this.get('session.authenticatedUser');
      const currentModel = this.get('request');
      const existingTags = this.get('tags');
      // if the tag already exists
      if (existingTags.findBy('properties.text', text)) {
        this.flashMessages.add({
          message: 'The tag: ' + text + ' already exists.',
          type: 'warning',
          timeout: 7000,
          class: 'fadeInOut'
        });
      } else {
        const tag = this.store.createRecord('action', {
          actionableId: currentModel.get('actionableId'),
          actionable_model: currentModel.constructor.modelName,
          userId: userId,
          type: 'tag',
          properties: {
            text: text
          }
        });
        tag.save().catch(Logger.error);
      }
    },
    toggleTagModal() {
      this.toggleProperty('isShowingTagModal');
    }
  }
});
