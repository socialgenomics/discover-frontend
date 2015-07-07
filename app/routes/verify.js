import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel:function(){
    //if verified transition to signup route
    if(this.controllerFor("Application").get("isVerified")){
      console.log('this should change');
      this.transitionTo('/users/signup');
    }
  }
});
