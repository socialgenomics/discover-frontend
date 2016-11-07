import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';

const { Controller, computed, Logger, get, set } = Ember;

export default Controller.extend(EmberValidations, {
  resetKey: null,
  password1: null,
  password2: null,
  loading: false,
  messages: [],
  passwordChanged: false,

  isDisabled: computed('loading', 'isValid', function() {
    return !this.get('isValid') || this.get('loading');
  }),

  clearMessages: function() {
    set(this, 'messages', []);
  }.observes('password1', 'password2'),

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
          this.flashMessages.add({
            message: 'Passwords do not match.',
            type: 'warning',
            timeout: 7000,
            class: 'fadeIn'
          });
        } else {
          ajax({
            url: ENV.APIRoutes['reset-password'],
            type: 'POST',
            data: {
              token: this.get('resetKey'),
              password: this.get('password1')
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
