import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { validator, buildValidations } from 'ember-cp-validations';

const { Controller, computed, Logger, get, set, inject: { service } } = Ember;
const Validations = buildValidations({
  email: [
    validator('presence', {
      presence: true,
      message: 'Please provide email address.'
    }),
    validator('format', {
      regex: /^([\w\-\.\+]+)@((?:[\w\-\.]+)(?:\.[a-zA-Z]{2,}))$/,
      message: 'Must be a valid email address.'
    })
  ]
});

export default Controller.extend(Validations, FlashMessageMixin, {
  ajax: service(),

  email: null,
  loading: false,

  isInvalid: computed.not('validations.isValid'),
  isDisabled: computed.or('loading', 'isInvalid'),

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
