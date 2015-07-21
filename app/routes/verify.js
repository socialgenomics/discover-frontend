import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel:function(){
    //if verified transition to signup route
    if(this.controllerFor("Application").get("isVerified")){
      this.transitionTo('/users/signup');
    }
  }
});
