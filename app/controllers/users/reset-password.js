import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { validator, buildValidations } from 'ember-cp-validations';

const { Controller, computed, Logger, get, set, setProperties, inject: { service }, RSVP } = Ember;
const Validations = buildValidations({
  password1: [
    validator('presence', {
      presence: true,
      message: 'Please provide new password.'
    }),
    validator('length', {
      min: 8,
      message: 'Must be at least 8 characters.'
    }),
    validator('format', {
      regex: /(?=.*\d)(?=.*[A-Z])/,
      message: 'Must include an uppercase letter and a number.'
    })
  ],
  password2: [
    validator('presence', {
      presence: true,
      message: 'Please provide matching password.'
    }),
    validator('length', {
      min: 8,
      message: 'Must be at least 8 characters.'
    }),
    validator('format', {
      regex: /(?=.*\d)(?=.*[A-Z])/,
      message: 'Must include an uppercase letter and a number.'
    })
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
