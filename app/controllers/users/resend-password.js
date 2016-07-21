import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';

export default Ember.Controller.extend(
  EmberValidations,
{
  email: null,
  loading: false,
  messages: [],

  buttonDisabled: function() {
    return !this.get('isValid') || this.get('loading');
  }.property('isValid', 'loading'),

  clearMessages: function() {
    this.set('messages', []);
  }.observes('email'),

  validations: {
    email: {
      presence: {
        message: ' '
      },
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'Must be a valid e-mail address'
      },
      server: true // must be last - known bug
    }
  },
  actions: {
    submitForm: function() {
      this.flashMessages.clearMessages();
      this.set('loading', true);
      ajax({
        url: ENV.APIRoutes['reset-password'] + '/' + this.get('email'),
        type: 'GET'
      })
      .then(resp => {
        this.flashMessages.add({
          message: 'We have sent an email to ' + this.get('email'),
          type: 'info',
          timeout: 7000,
          sticky: true,
          class: 'fadeIn'
        })
        .then(() => {
          this.reloadMessages(resp.messages);
        })
      })
      .catch(err => {
        console.log(err);
        if (err.errorThrown === 'Not Found') {
          this.flashMessages.add({
            message: 'We could not send an email to ' + this.get('email') + '. Please check you\'ve entered the correct email.',
            type: 'warning',
            timeout: 7000,
            sticky: true,
            class: 'fadeIn'
          })
          .then(() => {
            this.reloadMessages(err.jqXHR.responseJSON.messages);
          })
        }
      });
    }
  },
  reloadMessages: function(messages) {
    this.set('messages', []);
    this.get('messages').addObjects(messages);
  }
});
