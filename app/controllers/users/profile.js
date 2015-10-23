import Ember from "ember";

export default Ember.Controller.extend({
  saved:false,

  actions: {

    useGravatar: function() {
      this.set('model.profile.gravatar', true);
    },
    useAvatar: function() {
      this.set('model.profile.gravatar', false);
    },

    save:function(){
      this.get('model.user').save(),
      this.get('model.profile').save().then((model)=>{
        this.set('saved', true);
        console.log(model + " SAVED");
      });
    },
  },
});
