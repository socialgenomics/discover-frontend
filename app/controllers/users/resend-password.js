import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Controller, computed, observer, Logger, get, set, inject: { service } } = Ember;

export default Controller.extend(EmberValidations, FlashMessageMixin, {
  ajax: service(),

  email: null,
  loading: false,
  messages: [],
  isDisabled: computed('loading', 'isValid', function() {
    return !get(this, 'isValid') || get(this, 'loading');
  }),

  clearMessages: observer('email', function() {
    set(this, 'messages', []);
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
      server: true // must be last - known bug
    }
  },
  actions: {
    submitForm: function() {
      if (!get(this, 'isDisabled')) {
        this.flashMessages.clearMessages();
        set(this, 'loading', true);
        get(this, 'ajax').request(ENV.APIRoutes['reset-password'] + `/${get(this, 'email')}`, { method: 'GET' })
          .then(resp => {
            set(this, 'loading', false);
            this._addFlashMessage(`We have sent an email to ${get(this, 'email')}.`, 'success');
          })
          .catch(err => {
            set(this, 'loading', false);
            Logger.error(err);
            this._addFlashMessage(`We could not send an email to ${get(this, 'email')}. Please check you\'ve entered the correct email.`, 'warning');
          });
      }
    }
  }
});
