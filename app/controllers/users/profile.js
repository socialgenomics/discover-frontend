import Ember from "ember";

export default Ember.Controller.extend({
  currentUserDidChange: function(sender, key, value, context, rev) {
    this.set('model', this.get('session.currentUser'));
  }.observes('session.currentUser'),
  submitForm:function(){
    
  }
});
