import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tab'],
  tab: "comments",
  isModalShown:false,
  isEditingTags:false,

  comments: function(){
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['createdAt'],
      sortAscending: false,
      content: this.get('model.comments')
    });
  }.property('model.comments'),

  isPublic:function(){
    var access = this.get('model.repository.access');
    if(access == "public" || access =="open"){
      return true;
    }
  }.property('access'),

  actions: {
    //Register when someone click the "Access Data" button
    trackExit:function(){
      this.get('metrics').trackEvent({
        category: 'dataset',
        action: 'click',
        label: 'download',
        value: this.get('model.properties.webURL'),
      });
      //Hack to open link in new tab - NEED TO TEST THIS IN OTHER BROWSERS!
      var tab = window.open(this.get('model.properties.webURL'),'_blank');
      tab.focus();
    },

    addComment(text){
      var cmnt = this.store.createRecord('comment', {
        text: text,
        dataset: this.model,
        owner: this.get('session.secure.user'),
      });
      cmnt.save();
    },

    addTag(text){
      var tag = this.store.createRecord('tag',{
        word: text,
      });
      tag.dataset = this.model;
      this.get('model.tags').pushObject(tag);
      tag.save();
      this.set('isEditingTags', true);
    },

    removeTag(tag){
      var abc = this.get('model.tags').removeObject(tag);
      abc.save();
      console.log("removed tag");
    },

    toggleEditTags(){
      this.toggleProperty('isEditingTags');
    },

    toggleModal(){
      this.toggleProperty('isModalShown');
    },
  },
});
