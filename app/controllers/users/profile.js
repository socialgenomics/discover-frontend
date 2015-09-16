import Ember from "ember";

export default Ember.Controller.extend({
  saved:false,
  actions: {
    save:function(){
      this.get('model.user').save();
      this.get('model.profile').save();
      this.set('saved',true);
      this.get('metrics').trackEvent({
        category: 'profile',
        action: 'request',
        value: this.get('currentUser')
      });
    },
  },
});
