import Ember from "ember";

export default Ember.Controller.extend({
  currentUserDidChange: function(sender, key, value, context, rev) {
    this.set('model', this.get('session.currentUser'));
  }.observes('session.currentUser'),
  actions: {
    getInfo:function(){
      var currentUser = this.get('session.currentUser');
      var user = this.store.find('user', currentUser.id);
      console.log(user.username);
    },
    submitForm:function(){

    },
  },

});
