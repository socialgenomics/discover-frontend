import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import emailFormatValidator from 'repositive/validations/emailFormatValidator';
import { errorMessages } from 'repositive/validations/validations-config';

const { Component, get, set, computed, Logger, inject: { service } } = Ember;

const Validations = buildValidations({
  newEmail: [
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
    set(this, 'loading', true);
    get(this, 'ajax').request(ENV.APIRoutes['verify-email-resend'] + `/${newEmail}`, { method: 'GET' })
      .then(() => {
        set(this, 'sentEmail', true);
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

  classNames: ['u-mb2'],

  loading: false,
  sentEmail: false,
  addingCredential: false,

  newEmail: computed('credential.main_credential.email', function() {
    return get(this, 'credential.main_credential.email');
  }),

  isNotChanged: true,
  isInvalid: computed.not('validations.isValid'),
  isDisabled: computed.or('isNotChanged', 'isInvalid'),

  keyUp() {
    if (get(this, 'credential.main_credential.email') != get(this, 'newEmail')) { set(this, 'isNotChanged', false); }
  },

  actions: {
    resendVerifyEmail: verifyEmail,

    addCredential() {
      set(this, 'addingCredential', true);
    }
  }
});
