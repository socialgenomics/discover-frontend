import Ember from "ember";

export default Ember.Controller.extend({
  saved:false,
  actions: {
    save:function(){
      this.get('model.user').save();
      this.get('model.profile').save();
      this.set('saved',true);
      calq.user.profile(
          {"$full_name": this.get('model.user.displayName')}
      );
    },
  },
});
