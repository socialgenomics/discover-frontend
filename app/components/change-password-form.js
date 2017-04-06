import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import lengthValidator from 'repositive/validations/lengthValidator';
import passwordFormatValidator from 'repositive/validations/passwordFormatValidator';
import { errorMessages, lengths, lengthTypes } from 'repositive/validations/validations-config';

const { Component, get, computed } = Ember;

const Validations = buildValidations({
  oldPassword: [
    lengthValidator(lengths.password, lengthTypes.min),
    passwordFormatValidator()
  ],
  password1: [
    presenceValidator(errorMessages.newPassword),
    lengthValidator(lengths.password, lengthTypes.min),
    passwordFormatValidator()
  ],
  password2: [
    presenceValidator(errorMessages.matchingPassword),
    lengthValidator(lengths.password, lengthTypes.min),
    passwordFormatValidator()
  ]
});

export default Component.extend(Validations, {
  tagName: 'form',

  resetKey: null,
  oldPassword: null,
  password1: null,
  password2: null,
  loading: false,
  passwordChanged: false,

  isDisabled: computed('loading', 'validations.isValid', 'oldPassword', 'password1', 'password2', function() {
    return !get(this, 'validations.isValid') || get(this, 'loading') ||
      get(this, 'password1') !== get(this, 'password2');
  }),

  actions: {
    submitForm() {
      this.sendAction('submitForm');
    }
  }
});
