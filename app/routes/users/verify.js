import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { getLatestSecondaryCredential } from 'repositive/utils/credentials';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { inject: { service }, get, set, setProperties, RSVP, Logger, Route } = Ember;

function verifyEmail(credentials) {
  const email = get(getLatestSecondaryCredential(credentials), 'email');
  get(this, 'ajax').request(ENV.APIRoutes['verify-email-resend'] + `/${email}`, { method: 'GET' })
    .then(() => this._addFlashMessage('We have sent a verification email to your inbox', 'success'))
    .catch(err => {
      Logger.error(err);
      this._addFlashMessage('Sorry, we couldn\'t send you the link. Please try again later.', 'warning');
    });
}

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
        //updated the session token
        set(this, 'session.session.content.authenticated.token', params.verification_id)

        debugger;
        return RSVP.hash({
          verificationResp: resp,
          makePrimaryResp: get(this, 'ajax').request(ENV.APIRoutes['make-primary'] + '/' + params.verification_id, { method: 'GET' })
        });
      })
      .then(resp => {
        debugger;
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
            this.transitionTo('user', get(this, 'session.authenticatedUser.id'));
          } else {
            Logger.warn('session.authenticatedUser is undefined but session.isAuthenticated "true"');
            this.transitionTo('users.login');
          }
        } else {
          this.transitionTo('users.profile');
        }
        this._showMessages(resp);
      })
      .catch(err => {
        Logger.error(err);
        RSVP.resolve(); // fulfills the promise - this causes ember to render the template
      });
  },

  actions: {
    resendVerifyEmail() {
      this.store.query('credential', {
        'where.user_id': get(this, 'session.authenticatedUser.id')
      })
        .then(verifyEmail.bind(this))
        .catch(Logger.error)
    }
  },

  _showMessages: function(content) {
    if (content.message === 'success') {
      this._addFlashMessage('Your credential is now validated', 'success');
    } else {
      this._addFlashMessage('An unexpected error occurred', 'warning');
    }
  }
});
