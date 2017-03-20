import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import lengthValidator from 'repositive/validations/lengthValidator';
import passwordFormatValidator from 'repositive/validations/passwordFormatValidator';
import { errorMessages, lengths } from 'repositive/validations/validations-config';

const { Controller, computed, Logger, get, set, setProperties, inject: { service }, RSVP } = Ember;
const Validations = buildValidations({
  password1: [
    presenceValidator(errorMessages.newPassword),
    lengthValidator(lengths.password),
    passwordFormatValidator()
  ],
  password2: [
    presenceValidator(errorMessages.matchingPassword),
    lengthValidator(lengths.password),
    passwordFormatValidator()
  ]
});

export default Controller.extend(Validations, FlashMessageMixin, {
  ajax: service(),

  resetKey: null,
  password1: null,
  password2: null,
  loading: false,
  passwordChanged: false,

  isDisabled: computed('loading', 'validations.isValid', 'password1', 'password2', function() {
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
          return get(this, 'ajax').request(ENV.APIRoutes['reset-password'], {
            method: 'POST',
            data: {
              token: get(this, 'resetKey'),
              password: get(this, 'password1')
            }
          })
            .then(() => {
              setProperties(this, {
                loading: false,
                passwordChanged: true
              });
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
