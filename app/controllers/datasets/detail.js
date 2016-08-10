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
      var tag = this.store.createRecord('tag', {
        word: text
      });
      tag.dataset = this.model;
      this.get('model.tags').pushObject(tag);
      tag.save();
      this.set('isEditingTags', true);
    },

    toggleEditTags() {
      this.toggleProperty('isEditingTags');
    },

    toggleTagModal: function() {
      this.toggleProperty('isShowingTagModal');
    }
  }
});
