import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import lengthValidator from 'repositive/validations/lengthValidator';
import confirmationValidator from 'repositive/validations/confirmationValidator';
import passwordFormatValidator from 'repositive/validations/passwordFormatValidator';
import { errorMessages, lengths, lengthTypes } from 'repositive/validations/validations-config';

const { Component, Logger, computed, get, set, inject: { service } } = Ember;

const Validations = buildValidations({
  oldPassword: [
    presenceValidator(errorMessages.blankPassword),
    lengthValidator(lengths.password, lengthTypes.min)
  ],
  password1: [
    presenceValidator(errorMessages.newPassword),
    lengthValidator(lengths.password, lengthTypes.min),
    passwordFormatValidator()
  ],
  password2: [
    presenceValidator(errorMessages.matchingPassword),
    lengthValidator(lengths.password, lengthTypes.min),
    confirmationValidator('password1'),
    passwordFormatValidator()
  ]
});

export default Component.extend(Validations, FlashMessageMixin, {
  ajax: service(),
  session: service(),

  tagName: 'form',

  oldPassword: null,
  password1: null,
  password2: null,
  loading: false,

  isDisabled: computed('loading', 'validations.isValid', 'password1', 'password2', function() {
    return !get(this, 'validations.isValid') || get(this, 'loading') ||
      get(this, 'password1') !== get(this, 'password2');
  }),

  actions: {
    submitForm() {
      set(this, 'loading', true);
      return this._sendLoginRequest(get(this, 'email'), get(this, 'oldPassword'))
        .then(resp => {
          this._sendPasswordRequest(resp.response.token, get(this, 'password1'))
        })
        .catch(err => {
          this._addFlashMessage(`Old password is incorrect.`, 'warning');
          Logger.error(err);
        })
        .finally(set(this, 'loading', false));
    }
  },

  /**
   * @desc requests to login to access users auth token to reset password.
   * @param {*} email
   * @param {*} password
   */
  _sendLoginRequest(email, password) {
    return get(this, 'ajax').raw(ENV.APIRoutes['users.login'], {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        email: email,
        password: password
      })
    });
  },

  /**
   * @desc requests to reset users password by sending auth token and new password.
   * @param {*} token
   * @param {*} password
   */
  _sendPasswordRequest(token, password) {
    return get(this, 'ajax').request(ENV.APIRoutes['reset-password'], {
      method: 'POST',
      data: {
        token: token,
        password: password
      }
    })
    .then(() => {
      this._addFlashMessage('Password successfully changed', 'success');
      get(this, 'transitionToProfile')();
    })
    .catch(Logger.error)
  }
});
