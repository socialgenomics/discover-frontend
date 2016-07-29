import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  queryParams: ['tab'],
  tab: 'comments',
  isEditingTags: false,
  commentsSorted: Ember.computed.sort('model.comments', (a, b)=> {
    if (a.get('createdAt') < b.get('createdAt')) {
      return 1;
    } else if (a.get('createdAt') > b.get('createdAt')) {
      return -1;
    }
    return 0;
  }),

  isPublic: function() {
    let access = this.get('model.access');
    if (access === 'public' || access === 'open') {
      return true;
    }
  }.property('access'),

  actions: {
    //Register when someone click the "Access Data" button
    trackExit: function() {
      this.get('metrics').trackEvent({
        category: 'dataset',
        action: 'download',
        label: this.get('model.title')
      });
      //HACK to open link in new tab - NEED TO TEST THIS IN OTHER BROWSERS!
      let tab = window.open(this.get('model.url'), '_blank');
      tab.focus();
    },

    addComment(text) {
      const userId = this.get('session.authenticatedUser');
      const currentModelId = this.get('model.id');
      let comment = this.store.createRecord('action', {
        actionableId: currentModelId,
        userId: userId,
        type: 'comment',
        properties: {
          text: text
        }
      });
      comment.save().then((resp) => {
        console.log(resp);
      }).catch((err) => {
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

    removeTag(tag) {
      var abc = this.get('model.tags').removeObject(tag);
      abc.save();
      console.log('removed tag');
    },

    toggleEditTags() {
      this.toggleProperty('isEditingTags');
    },

    toggleTagModal: function() {
      this.toggleProperty('isShowingTagModal');
    }
  }
});
