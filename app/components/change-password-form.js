import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import lengthValidator from 'repositive/validations/lengthValidator';
import passwordFormatValidator from 'repositive/validations/passwordFormatValidator';
import { errorMessages, lengths, lengthTypes } from 'repositive/validations/validations-config';

const { Component, Logger, computed, get, set, inject: { service }, RSVP } = Ember;

const Validations = buildValidations({
  oldPassword: [
    presenceValidator(errorMessages.blankPassword),
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

export default Component.extend(Validations, FlashMessageMixin, {
  ajax: service(),
  session: service(),

  tagName: 'form',

  resetKey: null,
  oldPassword: null,
  password1: null,
  password2: null,
  loading: false,

  isDisabled: computed('loading', 'validations.isValid', 'oldPassword', 'password1', 'password2', function() {
    return !get(this, 'validations.isValid') || get(this, 'loading') ||
      get(this, 'password1') !== get(this, 'password2');
  }),

  actions: {
    submitForm() {
      if (!get(this, 'isDisabled')) {
        set(this, 'loading', true);

        // Run the Login request to access the auth token for password change
        return get(this, 'ajax').raw(ENV.APIRoutes['users.login'], {
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            email: get(this, 'email'),
            password: get(this, 'oldPassword')
          })
        })
        .then((resp) => {
          if (get(this, 'password1') !== get(this, 'password2')) {
            set(this, 'loading', false);
            return RSVP.reject(this._addFlashMessage(`Passwords do not match.`, 'warning'));
          } else {
            // Change the password
            return get(this, 'ajax').request(ENV.APIRoutes['reset-password'], {
              method: 'POST',
              data: {
                token: resp.response.token,
                password: get(this, 'password1')
              }
            })
            .then(() => {
              set(this, 'loading', false)
              this._addFlashMessage('Password successfully changed', 'success');
              get(this, 'transitionToProfile')();
            })
            .catch(err => {
              set(this, 'loading', false);
              Logger.error(err);
            });
          }
        })
        .catch(err => {
          this._addFlashMessage(`Old password is incorrect.`, 'warning');
          Logger.error(err);
        })
      } else {
        return RSVP.resolve();
      }
    }
  }
});
