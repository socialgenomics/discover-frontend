import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import emailFormatValidator from 'repositive/validations/emailFormatValidator';
import lengthValidator from 'repositive/validations/lengthValidator';
import { errorMessages, lengths, lengthTypes } from 'repositive/validations/validations-config';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
// import { isVerified } from 'repositive/utils/credentials';



const { get, getProperties, computed, Controller, inject: { service }, set } = Ember;
const Validations = buildValidations({
  email: [
    presenceValidator(errorMessages.blankEmail),
    emailFormatValidator()
  ],
  password: [
    presenceValidator(errorMessages.blankPassword),
    lengthValidator(lengths.password, lengthTypes.min)
  ]
});

export default Controller.extend(
  Validations,
  FlashMessageMixin,
  {
    session: service(),

    email: null,
    password: null,
    loading: false,

    isInvalid: computed.not('validations.isValid'),
    isDisabled: computed.or('loading', 'isInvalid'),

    actions: {
      submitForm() {
        if (!get(this, 'isDisabled')) {
          set(this, 'loading', true);
          return get(this, 'session')
            .authenticate('authenticator:repositive', getProperties(this, 'email', 'password'))
            // .then(this._setCredentialVerifyReminderFlag.bind(this))
            .then(this._displayMessage.bind(this))
            .catch(this._displayMessage.bind(this));
        }
      },

      resetPassword() {
        this.transitionToRoute('users.resend-password');
      }
    },

    _displayMessage(resp) {
      set(this, 'loading', false);
      if (resp) {
        const message = get(resp, 'status_code') !== 400 ?
          get(resp, 'message') :
          'Error: Invalid Email. Please check that you have typed your email correctly.';

        if (message) { this._addFlashMessage(message, 'warning'); }
      }
    }

    // _setCredentialVerifyReminderFlag() {
    //   set(
    //     this,
    //     'session.data.showCredentialVerifyReminder',
    //     isVerified(get(this, 'session.data.authenticated.user.credentials')) === false
    //   );
    // }

  }
);
