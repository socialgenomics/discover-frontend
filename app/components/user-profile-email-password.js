import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import emailFormatValidator from 'repositive/validations/emailFormatValidator';
import { errorMessages } from 'repositive/validations/validations-config';

const { Component, get, set, setProperties, computed, Logger, inject: { service } } = Ember;

const Validations = buildValidations({
  email: [
    presenceValidator(errorMessages.blankEmail),
    emailFormatValidator()
  ]
});

export function verifyEmail() {
  const email = get(this, 'credential.main_credential.email');
  setProperties(this, {
    'sentEmail': true,
    'loading': true,
    'addingCredential': false
  });
  get(this, 'ajax').request(ENV.APIRoutes['verify-email-resend'] + `/${email}`, { method: 'GET' })
    .then(() => {
      this._addFlashMessage('We have sent a verification email to your inbox', 'success');
    })
    .catch((err) => {
      Logger.error(err);
      this._addFlashMessage('Sorry, we couldn\'t send you the link. Please try again later.', 'warning');
    });
}

export default Component.extend(FlashMessageMixin, Validations, {
  session: service(),
  ajax: service(),

  loading: false,
  sentEmail: false,
  addingCredential: false,

  isInvalid: computed.not('validations.isValid'),
  isDisabled: computed.or('loading', 'isInvalid'),

  actions: {
    resendVerifyEmail: verifyEmail,

    addCredential() {
      set(this, 'addingCredential', true);
    }
  }
});
