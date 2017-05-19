import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { getLatestSecondaryCredential, mainCredential } from 'repositive/utils/credentials';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import VerificationMixin from 'repositive/mixins/verification';

const { inject: { service }, get, set, setProperties, Logger, Route } = Ember;

export default Route.extend(FlashMessageMixin, VerificationMixin, {
  ajax: service(),
  session: service(),

  model(params) {
    get(this, 'ajax').request(ENV.APIRoutes['verify-email'] + '/' + params.verification_id, { method: 'GET' })
      .then(resp => {
        set(this, 'session.session.content.authenticated.token', resp.token);
        return get(this, 'ajax').request(ENV.APIRoutes['make-primary'], { method: 'GET' });
      })
      .then(() => {
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
      })
      .catch(err => {
        Logger.error(err);
        set(this, 'controller.timeout_error', true);
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
  }
});
