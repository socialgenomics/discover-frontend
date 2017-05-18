import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { getLatestSecondaryCredential, mainCredential } from 'repositive/utils/credentials';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import VerificationMixin from 'repositive/mixins/verification';

const { inject: { service }, get, set, setProperties, RSVP, Logger, Route } = Ember;

export default Route.extend(FlashMessageMixin, VerificationMixin, {
  ajax: service(),
  session: service(),

  model(params) {
    get(this, 'ajax').request(ENV.APIRoutes['verify-email'] + '/' + params.verification_id, { method: 'GET' })
      .then(resp => {
        debugger;
        // set(this, 'session.session.content.authenticated.token', params.verification_id);
        set(this, 'session.session.content.authenticated.token', resp.token);
        debugger;
        return RSVP.hash({
          verificationResp: resp,
          makePrimaryResp: get(this, 'ajax').request(ENV.APIRoutes['make-primary'], { method: 'GET' })
        });
      })
      .then(resp => {
        debugger;
        if (get(this, 'session.isAuthenticated')) {
          if (get(this, 'session.authenticatedUser')) {
            setProperties(this, {
              'session.authenticatedUser.isEmailValidated': true,
              'session.data.displayWelcomeMessage': false
            });
          } else {
            Logger.warn('session.authenticatedUser is undefined but session.isAuthenticated "true"');
            this.transitionTo('users.login');
            set(this, 'session.data.displayWelcomeMessage', false);
          }
        } else {
          this.transitionTo('root');
        }
        this._showMessages(resp.verificationResp);
      })
      .catch(err => {
        Logger.error(err);
        set(this, 'timeout_error', true);
        RSVP.resolve(); // fulfills the promise - this causes ember to render the template
      });
  },

  actions: {
    resendVerifyEmail() {
      this.store.query('credential', {
        'where.user_id': get(this, 'session.authenticatedUser.id')
      })
        .then(credentials => {
          const latestSecondaryCredential = getLatestSecondaryCredential(credentials);
          if (latestSecondaryCredential) {
            const email = get(latestSecondaryCredential, 'email');
            return this._sendVerificationEmail(email);
          } else {
            const email = get(mainCredential(credentials), 'email');
            return this._sendVerificationEmail(email);
          }
        })
        .catch(Logger.error)
    }
  },

  _showMessages(content) {
    if (content.message === 'success') {
      this._addFlashMessage('Your email has been verified.', 'success');
    } else {
      this._addFlashMessage('An unexpected error occurred', 'warning');
    }
  }
});
