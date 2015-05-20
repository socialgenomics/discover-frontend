import Ember from "ember";

export default Ember.Controller.extend({
  currentUserDidChange: function(sender, key, value, context, rev) {
    this.set('model', this.get('session.currentUser'));
  }.observes('session.currentUser'),

  saved:false,
  actions: {
    //need to validate on save!!!
    save:function(){
      var userChanges = this.get('model.user');
      // var profileChanges = this.get('model.user.profile');
      userChanges.save();
      // profileChanges.save();
      this.set('saved',true);
    },
  },
});
