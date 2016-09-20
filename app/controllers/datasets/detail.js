import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  isEditingTags: false,
  comments: Ember.computed.filterBy('model.actionableId.actions', 'type', 'comment'),
  commentsSorted : Ember.computed.sort('comments', (itemA, itemB) => {
    if (itemA.get('createdAt') < itemB.get('createdAt')) {
      return 1;
    } else if (itemA.get('createdAt') > itemB.get('createdAt')) {
      return -1;
    }
    return 0;
  }),
  tags: Ember.computed.filterBy('model.actionableId.actions', 'type', 'tag'),

  actions: {
    trackExit: function() {
      this.get('metrics').trackEvent({
        category: 'dataset',
        action: 'download',
        label: this.get('model.title')
      });
      let tab = window.open(this.get('model.url'), '_blank');
      tab.focus();
    },

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
    },

    addTag(text) {
      const userId = this.get('session.authenticatedUser');
      const currentModel = this.get('model');
      const existingTags = this.get('tags');
      // if the tag already exists
      if(existingTags.findBy('properties.text', text)){
        console.log('Tag exists');
        this.flashMessages.add({
          message: 'The tag: ' + text + ' already exists.',
          type: 'warning',
          timeout: 7000,
          class: 'fadeInOut'
        });
      } else {
        let tag = this.store.createRecord('action', {
          actionableId: currentModel.actionableId,
          actionable_model: currentModel.constructor.modelName,
          userId: userId,
          type: 'tag',
          properties: {
            text: text
          }
        });
        tag.save()
        .catch((err) => {
          Ember.Logger.error(err);
        });
      }
    },

    toggleEditTags() {
      this.toggleProperty('isEditingTags');
    },

    toggleTagModal() {
      this.toggleProperty('isShowingTagModal');
    }
  }
});
