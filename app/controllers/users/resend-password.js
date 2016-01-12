import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';


export default Ember.Controller.extend(
  EmberValidations,
  ServerValidationMixin,
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
      this.set('loading', true);
      ajax({
        url: ENV.APIRoutes['reset-password'] + '/' + this.get('email'),
        type: 'GET'
      })
      .then(resp=> {
        this.reloadMessages(resp.messages);
      })
      .catch(err=> {
        this.reloadMessages(err.jqXHR.responseJSON.messages);
      });
    }
  },
  reloadMessages: function(messages) {
    this.set('messages', []);
    this.get('messages').addObjects(messages);
  }
});
