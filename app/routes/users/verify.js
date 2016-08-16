import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
import {verifyEmail} from './trust';

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
    .then(resp => {

      /**
      * Backend validated the email address - transitionTo the profile without
      * rendering the current page (i.e do not resolve the promise before transitioning).

        We cannot know the username of the current user unless it is stored in the
        session. This means we cannot redirect to current user's profile if they're
        not logged in.
      */
      if (this.get('session.isAuthenticated')) {
        debugger;
        if (this.get('session.authenticatedUser')) {
          debugger;
          this.get('session.authenticatedUser').set('isEmailValidated', true);
          this.get('session.data').set('displayWelcomeMessage', false);
          this.transitionTo('user', this.get('session.authenticatedUser.id'));
        } else {
          debugger;
          console.warn('session.authenticatedUser is undefined but session.isAuthenticated "true"');
          this.transitionTo('users.login');
        }
      } else {
        debugger;
        this.transitionTo('root');
      }

      this.showMessages(resp);
    })
    .catch((err)=> {
      debugger;
      Ember.Logger.error(err);
      Ember.RSVP.resolve(); // fulfills the promise - this causes ember to render the template
    });
  },

  actions: {
    resendVerifyEmail: verifyEmail
  },

  showMessages: function(content) {
    if (content.message === 'success') {
      this.flashMessages.add({
        message: 'Your credential is now validated',
        type: 'info',
        timeout: 7000,
        class: 'fadeInOut'
      });
    } else {
      this.flashMessages.add({
        message: 'An unexpected error occurred',
        type: 'warn',
        timeout: 7000,
        class: 'fadeInOut'
      });
    }
  }
});
