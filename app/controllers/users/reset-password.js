import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Controller, computed, Logger, get, set, setProperties, inject: { service }, RSVP } = Ember;

export default Controller.extend(EmberValidations, FlashMessageMixin, {
  ajax: service(),

  resetKey: null,
  password1: null,
  password2: null,
  loading: false,
  passwordChanged: false,

  isDisabled: computed('loading', 'isValid', 'password1', 'password2', function() {
    return !get(this, 'isValid') || get(this, 'loading') || get(this, 'password1') !== get(this, 'password2');
  }),

  validations: {
    password1: {
      presence: {
        message: ''
      },
      length: { minimum: 8, messages: { tooShort: 'Must be at least 8 characters long.' } },
      format: {
        with: /(?=.*\d)(?=.*[A-Z])/,
        message: 'Must include an uppercase letter and a number.'
      },
      server: true
    },
    password2: {
      presence: {
        message: ''
      },
      length: { minimum: 8, messages: { tooShort: ' Must be at least 8 characters long.' } },
      format: {
        with: /(?=.*\d)(?=.*[A-Z])/,
        message: 'Must include an uppercase letter and a number.'
      },
      server: true
    }
  },
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
