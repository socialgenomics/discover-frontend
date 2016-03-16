import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  sentEmail: false,

  actions: {
    resendVerifyEmail: function() {
      this.set('sentEmail', true);
      ajax({
        url: ENV.APIRoutes['verify-email-resend'] + '/' + this.get('session.authenticatedUser.email'),
        //url: '/api/users/verify/resend/' + this.get('session.authenticatedUser.email'), // t,
        type: 'GET'
      })
      .then(() => {
        this.flashMessages.add({
          message: 'We have sent a verification email to your inbox',
          type: 'success',
          timeout: 5000
        });
      })
      .catch(function(err) {
        Ember.Logger.error(err);
      });
    }
  }
});
