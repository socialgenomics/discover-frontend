import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Component, get, set, Logger, inject: { service } } = Ember;

export function verifyEmail() {
  const email = get(this, 'credential.main_credential.email');
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

export default Component.extend(FlashMessageMixin, {
  session: service(),
  ajax: service(),
  sentEmail: false,

  actions: {
    resendVerifyEmail: verifyEmail
  }
});
