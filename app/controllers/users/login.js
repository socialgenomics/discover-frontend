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
  actions: {
    submitForm: function() {
      this.set('loading', true);
      this.set('formSubmitted', true);
      this.get('session')
        .authenticate('authenticator:repositive', {
          email: this.email,
          password: this.password
        })
        .then(resp=> {
          this.set('loading', false);
        })
        .catch(err=> {
          this.displayMessages(err.messages)
          this.set('loading', false);
        });
    },

    resetPassword: function() {
      if (!Ember.isBlank(this.get('email'))) {
        ajax({
          url: ENV.APIRoutes['reset-password'] + '/' + this.get('email'),
          type: 'GET'
        })
        .then(resp=> {
          this.displayMessages(resp.messages);
        })
        .catch(err=> {
          this.displayMessages(err.jqXHR.responseJSON.messages);
        });
      } else {
        this.transitionToRoute('users.resend-password');
      }
    }
  },

  displayMessages: function(messages) {
    this.addValidationErrors(messages);
    this.set('messages', []);
    this.get('messages').addObjects(messages);
  }
});
