import Ember from 'ember';
import ThirdParty from 'repositive/mixins/third-party-route-mixin';

export default Ember.Route.extend(ThirdParty, {
  beforeModel:function(){
    //if not verified transition to verify route
    if(!this.controllerFor("Application").get("isVerified")){
      this.transitionTo('verify');
    }
  },
});
