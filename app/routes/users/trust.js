import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { get, set, inject: { service }, Logger, Route } = Ember;

export function isVerified(credentials) {
  return credentials.reduce((acc, curr) => acc || get(curr, 'verified'), false);
}

export function mainCredential(credentials) {
  return credentials.filter((c) => get(c, 'primary'))[0];
}

export function verifyEmail() {
  const email = get(this, 'session.authenticatedUser.credentials.content.currentState')[0].record.get('email');
  set(this, 'sentEmail', true);
  get(this, 'ajax').request(ENV.APIRoutes['verify-email-resend'] + `/${email}`, { method: 'GET' })
    .then(() => {
      this._addFlashMessage('We have sent a verification email to your inbox', 'success');
    })
    .catch((err) => {
      Logger.error(err);
      this._addFlashMessage('Sorry, we couldn\'t send you the link. Please try again later.', 'warning');
    });
}

export default Route.extend(AuthenticatedRouteMixin, FlashMessageMixin, {
  ajax: service(),
  session: service(),
  sentEmail: false,

  actions: {
    resendVerifyEmail: verifyEmail
  },

  model: function() {
    const userId = get(this, 'session.session.authenticated.user.id');
    return this.store.query('credential', { 'where.user_id': userId }).then((credentials) => {
      return {
        is_verified: isVerified(credentials),
        main_credential: mainCredential(credentials)
      };
    });
  }
});
