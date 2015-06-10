import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tab'],
  tab: "comments",
  isModalShown:false,

  isPublic:function(){
    var accessType = this.get('model.repository.accessType');
    if(accessType == "public" || accessType =="open"){
      return true;
    }
  }.property('accessType'),

  actions: {
    addComment:function(text){
      var cmnt = this.store.createRecord('comment', {
        text:text,
      });
      cmnt.dataset = this.model.id; //THIS DOESN'T WORK!
      cmnt.user = this.get('session.user.id');
      cmnt.save();
    },
    toggleModal(){
      this.toggleProperty('isModalShown');
    },
  },
});
