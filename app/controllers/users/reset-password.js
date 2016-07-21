import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';

export default Ember.Controller.extend(
  EmberValidations,
{
  resetKey: null,
  password1: null,
  password2: null,
  loading: false,
  messages: [],
  passwordChanged: false,

  buttonDisabled: function() {
    return !this.get('isValid') || this.get('loading');
  }.property('isValid', 'loading'),

  clearMessages: function() {
    this.set('messages', []);
  }.observes('password1', 'password2'),

  validations: {
    password1: {
      presence: {
        message: ''
      },
      length: { minimum: 8, messages: { tooShort: ' ' } },
      format: {
        with: /(?=.*\d)(?=.*[A-Z])/,
        //allowBlank: true,
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
        //allowBlank: true,
        message: 'Must be at least 8 characters and include an uppercase letter and a number.'
      },
      server: true
    }
  },
  actions: {
    submitForm: function() {
      this.set('loading', true);
      if (this.get('password1') !== this.get('password2')) {
        this.flashMessages.add({
          message: 'Passwords do not match.',
          type: 'warning',
          timeout: 7000,
          sticky: true,
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
          this.set('passwordChanged', true)
          .then(() => {
            this.reloadMessages(resp.messages);
          });
        })
        .catch(err => {
          console.log('ERROR ' + err);
          if (err) {
            this.reloadMessages(err.jqXHR.responseJSON.messages);
          }
        });
      }
    }
  },
  reloadMessages: function(messages) {
    this.set('messages', []);
    this.get('messages').addObjects(messages);
  }
});
