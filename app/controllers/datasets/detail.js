import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  queryParams: ['tab'],
  tab: 'comments',
  isEditingTags: false,
  isEditingDataset: false,

  commentsSorted: Ember.computed.sort('model.comments', (a, b)=> {
    if (a.get('createdAt') < b.get('createdAt')) {
      return 1;
    } else if (a.get('createdAt') > b.get('createdAt')) {
      return -1;
    }
    return 0;
  }),

  isPublic: function() {
    var access = this.get('model.repository.access');
    if (access === 'public' || access === 'open') {
      return true;
    }
  }.property('access'),


  isOwner: function() {
    const user = this.get('session.authenticatedUser.id');
    const owner = this.get('model.owner.id');
    return (user === owner);
  }.property('id'),

  actions: {
    //Register when someone click the "Access Data" button
    trackExit: function() {
      this.get('metrics').trackEvent({
        category: 'dataset',
        action: 'download',
        label: this.get('model.properties.title')
      });
      //HACK to open link in new tab - NEED TO TEST THIS IN OTHER BROWSERS!
      var tab = window.open(this.get('model.properties.webURL'), '_blank');
      tab.focus();
    },

    editDataset: function() {
      this.toggleProperty('isEditingDataset');
    },

    saveDataset: function() {
      let dataset = this.get('model');
      var props = this.get('model.properties', {
        title: this.title,
        description: this.description
      });
      dataset.properties = props;

      dataset.save()
    },

    addComment(text) {
      var cmnt = this.store.createRecord('comment', {
        text: text,
        dataset: this.model,
        owner: this.get('session.data.authenticatedUser.id')
      });
      cmnt.save();
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
    }
  }
});
