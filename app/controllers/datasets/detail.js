import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  queryParams: ['tab'],
  tab: 'comments',
  isEditingTags: false,
  comments: Ember.computed.sort('model.commnets', 'createdAt:desc'),

  // setAvatar: function() {
  //   this.set('avatar', this.get('application').get('avatar'));
  // }.on('init'),

  // setAvatarsOnComments: function() {
  //   this.get('model.comments.@each.UserId').forEach((id)=> {
  //     this.store.query('profile', { UserId: id });
  //   });
  // }.observes('model.comments'),

  isPublic: function() {
    var access = this.get('model.repository.access');
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
        label: this.get('model.id')
      });
      //Hack to open link in new tab - NEED TO TEST THIS IN OTHER BROWSERS!
      var tab = window.open(this.get('model.properties.webURL'), '_blank');
      tab.focus();
    },

    addComment(text) {
      var cmnt = this.store.createRecord('comment', {
        text: text,
        dataset: this.model,
        owner: this.get('session.data.authenticated.user.id')
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
