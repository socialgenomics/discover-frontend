import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tab'],
  tab: "comments",
  isPublic:function(){
    var accessType = this.get('model.repository.accessType');
    if(accessType === "public"){
      return true;
    }
  }.property('accessType'),
  isRestricted:function(){
    var accessType = this.get('model.repository.accessType');
    var accessIcon;
    if(accessType === "restricted") {
      accessIcon = "mdi-action-lock";
      return true;
    }
  }.property('accessType','accessIcon'),
  isPrivate: function() {
    var accessType = this.get('model.repository.accessType');
    if (accessType === "private") {
      return true;
    }
  }.property('accessType'),
  actions: {
    addComment:function(text){
      var cmnt = this.store.createRecord('comment', {
        text:text,
      });
      cmnt.save();
    },
  },

});
