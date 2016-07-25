import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
const { get } = Ember;

export default Ember.Controller.extend(
  EmberValidations,
{
  session: Ember.inject.service(),
  email: null,
  password: null,
  loading: false,
  formSubmitted: false,

  buttonDisabled: function() {
    return !this.get('isValid') || this.get('loading');
  }.property('isValid', 'loading'),

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
      // fix for password manager bug
      Ember.$('#login-form').find('input').trigger('change');

      this.set('loading', true);
      this.set('formSubmitted', true);
      this.get('session')
      .authenticate('authenticator:repositive', {
        email: this.get('email'),
        password: this.get('password')
      })
      .then(this.displayMessage.bind(this))
      .catch(this.displayMessage.bind(this));
    },

    resetPassword: function() {
      this.transitionToRoute('users.resend-password');
    }
  }
});
