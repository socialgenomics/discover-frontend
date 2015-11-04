import Ember from "ember";

export default Ember.Controller.extend({
  saved:false,

  actions: {

    useGravatar: function() {
      return this.set('model.profile.gravatar', true);
    },
    useAvatar: function() {
      return this.set('model.profile.gravatar', false);
    },
    save:function(){
      this.get('model.user').save();
      this.get('model.profile').save();
      this.set('saved', true);
    },
  },
});
