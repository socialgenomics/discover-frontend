import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Controller, computed, Logger, get, set, inject: { service } } = Ember;

export default Controller.extend(EmberValidations, FlashMessageMixin, {
  ajax: service(),

  email: null,
  loading: false,
  isDisabled: computed('loading', 'isValid', function() {
    return !get(this, 'isValid') || get(this, 'loading');
  }),

  validations: {
    email: {
      presence: {
        message: ' '
      },
      format: {
        with: /^([\w\-\.\+]+)@((?:[\w\-\.]+)(?:\.[a-zA-Z]{2,}))$/,
        message: 'Must be a valid e-mail address'
      },
      server: true // must be last - known bug
    }
  },
  actions: {
    submitForm() {
      if (!get(this, 'isDisabled')) {
        set(this, 'loading', true);
        return get(this, 'ajax').request(ENV.APIRoutes['reset-password'] + `/${get(this, 'email')}`, { method: 'GET' })
          .then(() => {
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
