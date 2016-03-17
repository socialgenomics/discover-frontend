import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  verificationId: null,

  model: function(params) {
    // return a promise.. this pauses the page rendering until the promise is resolved or rejected
    // loding page is shown whilst the promise in unresolved
    // error page is shown if the promise is rejected
    return ajax({
      url: ENV.APIRoutes['verify-email'] + '/' + params.verificationId,
      type: 'GET'
    })
    .then(resp=> {
      this.showMessages(resp.messages);

      /**
      * Backend validated the email address - transitionTo the profile without
      * rendering the current page (i.e do not resolve the promise before transitioning).

        We cannot know the username of the current user unless it is stored in the
        session. This means we cannot redirect to current user's profile if they're
        not logged in.
      */
      if (this.get('session.isAuthenticated')) {
        if (this.get('session.authenticatedUser')) {
          this.get('session.authenticatedUser').set('isEmailValidated', true);
          this.transitionTo('user', this.get('session.authenticatedUser.username'));
        } else {
          console.warn('session.authenticatedUser is undefined but session.isAuthenticated "true"')
          this.transitionTo('users.login');
        }
      } else {
        this.transitionTo('users.login');
      }
    })
    .catch((err)=> {
      Ember.Logger.error(err);
      Ember.RSVP.resolve(); // fulfills the promise - this causes ember to render the template
    });
  },

  actions: {
    resendVerifyEmail: function() {
      ajax({
        url: '/api/users/verify/resend/' + this.get('session.authenticatedUser.email'),
        type: 'GET'
      });
    }
  },
  showMessages: function(messages) {
    messages.forEach(message=> {
      Ember.get(this, 'flashMessages')[message.type](message.text);
    });
  }
});
