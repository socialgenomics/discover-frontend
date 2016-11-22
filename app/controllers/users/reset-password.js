import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';


const { Controller, computed, observer, Logger, get, set, inject: { service } } = Ember;

export default Controller.extend(EmberValidations, FlashMessageMixin, {
  ajax: service(),

  resetKey: null,
  password1: null,
  password2: null,
  loading: false,
  messages: [],
  passwordChanged: false,

  isDisabled: computed('loading', 'isValid', function() {
    return !get(this, 'isValid') || get(this, 'loading');
  }),
  clearMessages: observer('password1', 'password2', function() {
    set(this, 'messages', []);
  }),

  validations: {
    password1: {
      presence: {
        message: ''
      },
      length: { minimum: 8, messages: { tooShort: ' ' } },
      format: {
        with: /(?=.*\d)(?=.*[A-Z])/,
        message: 'Must be at least 8 characters and include an uppercase letter and a number.'
      },
      server: true
    },
    password2: {
      presence: {
        message: ''
      },
      length: { minimum: 8, messages: { tooShort: ' ' } },
      format: {
        with: /(?=.*\d)(?=.*[A-Z])/,
        message: 'Must be at least 8 characters and include an uppercase letter and a number.'
      },
      server: true
    }
  },
  actions: {
    submitForm: function() {
      if (!get(this, 'isDisabled')) {
        set(this, 'loading', true);
        if (get(this, 'password1') !== get(this, 'password2')) {
          this._addFlashMessage(`Passwords do not match.`, 'warning');
        } else {
          get(this, 'ajax').request(ENV.APIRoutes['reset-password'], {
            method: 'POST',
            data: {
              token: get(this, 'resetKey'),
              password: get(this, 'password1')
            }
          })
            .then(resp => {
              set(this, 'loading', false);
              set(this, 'passwordChanged', true);
            })
            .catch(err => {
              set(this, 'loading', false);
              Logger.error(err);
            });
        }
      }
    }
  }
});
