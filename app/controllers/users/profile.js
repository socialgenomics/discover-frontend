import Ember from "ember";

export default Ember.Controller.extend({
  currentUserDidChange: function(sender, key, value, context, rev) {
    this.set('model', this.get('session.currentUser'));
  }.observes('session.currentUser'),

  saved:false,
  actions: {
    save:function(){
      this.get('model.user').save();
      this.get('model.profile').save();
      this.set('saved',true);
    },
  },
});
