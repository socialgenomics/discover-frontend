import Ember from 'ember';
import EmberValidations from 'ember-validations';
const { get, computed } = Ember;

export default Ember.Controller.extend(
  EmberValidations,
{
  session: Ember.inject.service(),
  email: null,
  password: null,
  loading: false,
  formSubmitted: false,
  isDisabled: computed('loading', 'isValid', function() {
    return this.get('loading') || !this.get('isValid');
  }),

  validations: {
    email: {
      presence: {
        message: ' '
      },
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'Must be a valid e-mail address'
      },
      server: true // must be last - unknown bug
    },
    password: {
      presence: {
        message: ' '
      },
      length: { minimum: 8, messages: { tooShort: 'Must be at least 8 characters.' } },
      server: true // must be last - unknown bug
    }
  },
  displayMessage(resp) {
    this.set('loading', false);
    if (resp) {
      const errorCode = get(resp, 'status_code');
      let message;
      if (errorCode === 400) { //Bad Request
        message = 'Error: Invalid Email. Please check that you have typed your email correctly.';
      } else {
        message = get(resp, 'message');
      }
      if (message) {
        this.flashMessages.add({
          message: message,
          type: 'warning',
          timeout: 7000,
          class: 'fadeIn'
        });
      }
    }
  },

  actions: {
    submitForm: function() {
      if (!this.get('isDisabled')) {
        Ember.$('#login-form').find('input').trigger('change'); // fix for password manager bug
        this.set('loading', true);
        this.set('formSubmitted', true);
        this.get('session')
        .authenticate('authenticator:repositive', {
          email: this.get('email'),
          password: this.get('password')
        })
        .finally(this.displayMessage.bind(this));
      }
    },

    resetPassword: function() {
      this.transitionToRoute('users.resend-password');
    }
  }
});
