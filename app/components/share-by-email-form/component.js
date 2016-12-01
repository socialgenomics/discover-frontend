import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';

const { Component, computed, get, inject: { service }, set, setProperties } = Ember;

export default Component.extend(EmberValidations, {
  ajax: service(),

  tagName: 'form',
  emailAddress: '',
  customMessage: '',
  actionableId: null,
  sendSuccess: false,
  sendError: false,
  isLoading: false,

  validations: {
    emailAddress: {
      presence: { message: 'Please provide email address.' },
      format: {
        with: /^([\w\-\.\+]+)@((?:[\w\-\.]+)(?:\.[a-zA-Z]{2,}))$/,
        allowBlank: false,
        message: 'Must be a valid email address.'
      }
    }
  },

  submitDisabled: computed('isLoading', 'errors.emailAddress.length', function() {
    return get(this, 'isLoading') || get(this, 'errors.emailAddress.length') !== 0;
  }),

  submitButtonLabel: computed('isLoading', 'sendSuccess', 'sendError', function () {
    switch (true) {
      case get(this, 'isLoading') :
        return 'Sending the email...';
      case get(this, 'sendSuccess') :
        return 'Back to dataset';
      case get(this, 'sendError') :
        return 'Try again later';
      default:
        return 'Send the Email';
    }
  }),

  submit(event) {
    event.preventDefault();

    // close modal if send action already taken by user
    if (get(this, 'sendSuccess') || get(this, 'sendError')) {
      get(this, 'onClose')();
    } else {
      set(this, 'isLoading', true);

      this._sendCustomEmail()
        .then(this._onSendSuccess.bind(this))
        .catch(this._onSendError.bind(this));
    }
  },

  _onSendSuccess() {
    setProperties(this, {
      sendSuccess: true,
      isLoading: false
    });
  },

  _onSendError() {
    setProperties(this, {
      sendError: true,
      isLoading: false
    });
  },

  _sendCustomEmail() {
    return get(this, 'ajax').request(
      ENV.APIRoutes['share'],
      {
        method: 'POST',
        data: {
          to: get(this, 'emailAddress'),
          customMessage: get(this, 'customMessage'),
          actionable_id: get(this, 'actionableId'),
          actionable_model: 'dataset'
        }
      }
    );
  }
});
