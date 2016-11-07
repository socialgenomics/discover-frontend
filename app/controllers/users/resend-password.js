import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';

const { Controller, computed, Logger } = Ember;

export default Controller.extend(
  EmberValidations,
{
  email: null,
  loading: false,
  messages: [],
  isDisabled: computed('loading', 'isValid', function() {
    return !this.get('isValid') || this.get('loading');
  }),

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
      if (!this.get('isDisabled')) {
        this.flashMessages.clearMessages();
        this.set('loading', true);
        ajax({
          url: ENV.APIRoutes['reset-password'] + '/' + this.get('email'),
          type: 'GET'
        })
        .then(resp => {
          this.set('loading', false);
          this.flashMessages.add({
            message: 'We have sent an email to ' + this.get('email'),
            type: 'info',
            timeout: 7000,
            class: 'fadeIn'
          });
        })
        .catch(err => {
          this.set('loading', false);
          Logger.error(err);
          if (err.errorThrown === 'Not Found' || err.errorThrown === 'Bad Request') {
            this.flashMessages.add({
              message: 'We could not send an email to ' + this.get('email') + '. Please check you\'ve entered the correct email.',
              type: 'warning',
              timeout: 7000,
              class: 'fadeIn'
            });
          }
        });
      }
    }
  }
});
