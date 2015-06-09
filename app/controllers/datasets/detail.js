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
    //link user to comment
    addComment:function(text){
      var cmnt = this.store.createRecord('comment', {
        text:text,
      });
      cmnt.save();
      console.log(text);
    },
    toggleModal(){
      this.toggleProperty('isModalShown');
    },
  },
});
