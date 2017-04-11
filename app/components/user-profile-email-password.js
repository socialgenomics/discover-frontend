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
  const newEmail = get(this, 'newEmail');

  if (newEmail === email && get(this, 'credential.is_verified')) {
    set(this, 'addingCredential', false);
    this._addFlashMessage('This email has already been verified.', 'success');
  } else {
    setProperties(this, {
      'sentEmail': true,
      'loading': true
    });
    get(this, 'ajax').request(ENV.APIRoutes['verify-email-resend'] + `/${newEmail}`, { method: 'GET' })
      .then(() => {
        this._addFlashMessage('We have sent a verification email to your inbox', 'success');
      })
      .catch((err) => {
        Logger.error(err);
        this._addFlashMessage('Sorry, we couldn\'t send you the link. Please try again later.', 'warning');
      });
  }
}

export default Component.extend(FlashMessageMixin, Validations, {
  session: service(),
  ajax: service(),

  loading: false,
  sentEmail: false,
  addingCredential: false,

  newEmail: computed('credential.main_credential.email', function() {
    return get(this, 'credential.main_credential.email');
  }),

  isInvalid: computed.not('validations.isValid'),
  isDisabled: computed.or('loading', 'isInvalid'),

  actions: {
    resendVerifyEmail: verifyEmail,

    addCredential() {
      set(this, 'addingCredential', true);
    }
  }
});
