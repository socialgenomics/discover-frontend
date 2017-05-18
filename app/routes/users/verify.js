import Ember from 'ember';
import ENV from 'repositive/config/environment';
import {verifyEmail} from './trust';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { inject: { service }, get, setProperties, RSVP, Logger, Route } = Ember;

export default Route.extend(FlashMessageMixin, {
  ajax: service(),
  session: service(),
  verificationId: null,

  model: function(params) {
    // return a promise.. this pauses the page rendering until the promise is resolved or rejected
    // loding page is shown whilst the promise in unresolved
    // error page is shown if the promise is rejected
    get(this, 'ajax').request(ENV.APIRoutes['verify-email'] + '/' + params.verification_id, { method: 'GET' })
    .then(resp => {
      /**
      * Backend validated the email address - transitionTo the profile without
      * rendering the current page (i.e do not resolve the promise before transitioning).

        We cannot know the username of the current user unless it is stored in the
        session. This means we cannot redirect to current user's profile if they're
        not logged in.
      */
      if (get(this, 'session.isAuthenticated')) {
        if (get(this, 'session.authenticatedUser')) {
          setProperties(this, {
            'session.authenticatedUser.isEmailValidated': true,
            'session.data.displayWelcomeMessage': false
          });
        } else {
          Logger.warn('session.authenticatedUser is undefined but session.isAuthenticated "true"');
          this.transitionTo('users.login');
        }
      } else {
        this.transitionTo('root');
      }
      this._showMessages(resp);
    })
    .catch(err => {
      Logger.error(err);
      setProperties(this, {
        timeout_error: true
      });
      RSVP.resolve(); // fulfills the promise - this causes ember to render the template
    });
  },

  actions: {
    resendVerifyEmail: verifyEmail
  },

  _showMessages: function(content) {
    if (content.message === 'success') {
      this._addFlashMessage('Your email has been verified.', 'success');
    } else {
      this._addFlashMessage('An unexpected error occurred', 'warning');
    }
  }
});
