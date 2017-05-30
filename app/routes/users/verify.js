import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { getLatestSecondaryCredential, mainCredential, secondaryCredentials, fetchCredentials } from 'repositive/utils/credentials';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import VerificationMixin from 'repositive/mixins/verification';

const { inject: { service }, get, set, setProperties, Logger, Route, RSVP } = Ember;

export default Route.extend(FlashMessageMixin, VerificationMixin, {
  ajax: service(),
  session: service(),

  model(params) {
    return RSVP.hash({
      'verificationResp': get(this, 'ajax')
        .request(ENV.APIRoutes['verify-email'] + '/' + params.verification_id, { method: 'GET' }),
      'credentials': fetchCredentials(this.store,  get(this, 'session.session.content.authenticated.user.id'))
    })
      .then(resp => {
        if (get(resp, 'credentials.length') === 1) { return; }
        const credentialId = getLatestSecondaryCredential(secondaryCredentials(resp.credentials)).id;
        set(this, 'session.session.content.authenticated.token', resp.verificationResp.token);
        return this._makeCredentialPrimary(credentialId);
      })
      .then(() => {
        if (get(this, 'session.isAuthenticated')) {
          if (get(this, 'session.authenticatedUser')) {
            setProperties(this, {
              'session.authenticatedUser.isEmailValidated': true,
              'session.data.displayWelcomeMessage': false
            });
          } else {
            //TODO this is alwyas the case when first verifying - WHY?
            // Because session.authenticatedUser is not set.
            Logger.warn('session.authenticatedUser is undefined but session.isAuthenticated "true"');
            this.transitionTo('users.login');
            set(this, 'session.data.displayWelcomeMessage', false);
          }
        } else {
          this.transitionTo('root');
        }
      })
      .catch(err => {
        Logger.error(err);
        set(this, 'controller.timeout_error', true);
      });
  },

  actions: {
    resendVerifyEmail() {
      return fetchCredentials(this.store, get(this, 'session.authenticatedUser.id'))
        .then(credentials => {
          const latestSecondaryCredential = getLatestSecondaryCredential(secondaryCredentials(credentials));
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
  }
});
