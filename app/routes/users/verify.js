import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { getLatestSecondaryCredential, mainCredential, secondaryCredentials, fetchCredentials } from 'repositive/utils/credentials';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import VerificationMixin from 'repositive/mixins/verification';

const { inject: { service }, get, set, Logger, Route, RSVP } = Ember;

export default Route.extend(FlashMessageMixin, VerificationMixin, {
  ajax: service(),
  session: service(),

  model(params) {
    const self = this;
    return get(this, 'ajax').request(ENV.APIRoutes['verify-email'] + '/' + params.verification_id, { method: 'GET'})
      .then(verificationResp => {
        return get(this, 'session').authenticate('authenticator:repositive', verificationResp).then(() => verificationResp)
      })
      .then(verificationResp => {
        return RSVP.hash({
          'credentials': fetchCredentials(this.store, verificationResp.user_id),
          'user': this.store.findRecord('user', verificationResp.user_id)
        })
      })
      .then(resp => {
        if (get(resp, 'credentials.length') === 1) {
          return { user: resp.user }
        }

        const credentialId = getLatestSecondaryCredential(secondaryCredentials(resp.credentials)).id;

        return RSVP.hash({
          'user': resp.user,
          'makePrimaryResp': this._makeCredentialPrimary(credentialId)
        });
      })
      .then(resp => {
        if (get(this, 'session.isAuthenticated')) {
          const user = resp.user;
          set(user, 'verified', true);
          return user.save();
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
