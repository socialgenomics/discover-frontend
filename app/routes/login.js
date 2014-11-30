import Ember from 'ember';

var LoginRouter = Ember.Route.extend({
  actions: {
    // action to trigger authentication with Facebook
    authenticateWithFacebook: function() {
      this.get('session').authenticate('simple-auth-authenticator:torii', 'facebook-oauth2');
    },
    // action to trigger authentication with Google+
    authenticateWithGooglePlus: function() {
      this.get('session').authenticate('simple-auth-authenticator:torii', 'google-oauth2');
    }
  }
});

export default LoginRouter;
