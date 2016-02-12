import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  sentEmail: false,

  actions: {
    resendVerifyEmail: function() {
      this.set('sentEmail', true);
      ajax({
        url: '/api/users/verify/resend/' + this.get('session.authenticatedUser.email'), // t,
        type: 'GET'
      })
      .then((created)=> {
        this.flashMessages.add({
          message: 'We have sent a verification email to your inbox',
          type: 'success',
          timeout: 5000
        });
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  }
});
