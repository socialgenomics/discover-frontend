import Ember from 'ember';
import ajax from 'ic-ajax';

var LoginRouter = Ember.Route.extend({
  actions: {
    // action to trigger authentication with Facebook
    authenticateWithFacebook: function() {
      this.get('session').authenticate('simple-auth-authenticator:torii', 'facebook-oauth2').then(function(value){
        console.log('complete');
      }, function(err){
         console.log('facebok login failed')
      });
    },
    // action to trigger authentication with Google+
    authenticateWithGooglePlus: function() {
      var router = this;
      this.get('session').authenticate('simple-auth-authenticator:torii', 'google-oauth2').then(function(thing){
        console.log('success');
        debugger;
        //ajax.post({'some':'stuff'})
        //router.flashMessage('success', 'Congratulations! Your changes have been saved', 1000);
      }, function(err){
        //router.flashMessage('error','problem with login');
      });
    },
    // action to trigger authentication with Linked-in
    authenticateWithLinkedIn: function() {
      this.get('session').authenticate('simple-auth-authenticator:torii', 'linked-in-oauth2');
    }
  }
});

export default LoginRouter;
