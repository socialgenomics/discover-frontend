import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import lengthValidator from 'repositive/validations/lengthValidator';
import passwordFormatValidator from 'repositive/validations/passwordFormatValidator';
import { errorMessages, lengths, lengthTypes } from 'repositive/validations/validations-config';

const { Component, Logger, computed, get, set, setProperties, inject: { service }, RSVP } = Ember;

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
      if (!get(this, 'isDisabled')) {
        set(this, 'loading', true);
        if (get(this, 'password1') !== get(this, 'password2')) {
          set(this, 'loading', false);
          return RSVP.reject(this._addFlashMessage(`Passwords do not match.`, 'warning'));
        } else {
          return get(this, 'ajax').request(ENV.APIRoutes['change-password'], {
            method: 'POST',
            data: {
              password: get(this, 'password1')
            }
          })
            .then(() => {
              setProperties(this, {
                loading: false,
                passwordChanged: true
              })
              .then(() => {
                this._addFlashMessage('Password successfully changed', 'success');
                this.transitionToRoute('users.profile');
              })
            })
            .catch(err => {
              set(this, 'loading', false);
              Logger.error(err);
            });
        }
      } else {
        return RSVP.resolve();
      }
    }
  }
});
