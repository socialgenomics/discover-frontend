import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export default Ember.Controller.extend(
  EmberValidations,
  ServerValidationMixin,
{
  session: Ember.inject.service(),
  email: null,
  password: null,
  loading: false,
  formSubmitted: false,
  messages: [],

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
  displayMessages: function(resp) {
    let messages = resp.messages;
    this.addValidationErrors(messages);
    this.set('messages', []);
    this.get('messages').addObjects(messages);
    this.set('loading', false);
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
      .then(this.displayMessages.bind(this))
      .catch(this.displayMessages.bind(this));
    },

    resetPassword: function() {
      if (!Ember.isBlank(this.get('email'))) {
        ajax({
          url: ENV.APIRoutes['reset-password'] + '/' + this.get('email'),
          type: 'GET'
        })
        .then(this.displayMessages.bind(this))
        .catch(this.displayMessages.bind(this));
      } else {
        this.transitionToRoute('users.resend-password');
      }
    }
  }
});
