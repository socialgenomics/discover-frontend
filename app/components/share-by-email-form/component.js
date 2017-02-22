import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { validator, buildValidations } from 'ember-cp-validations';

const { Component, computed, get, inject: { service }, set, setProperties } = Ember;
const Validations = buildValidations({
  emailAddress: [
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

export default Component.extend(Validations, {
  ajax: service(),

  tagName: 'form',
  emailAddress: '',
  customMessage: '',
  actionableId: null,
  actionableType: null,
  sendSuccess: false,
  sendError: false,
  isLoading: false,

  submitDisabled: computed('isLoading', 'validations.isValid', function() {
    return get(this, 'isLoading') || get(this, 'validations.isValid') === false;
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
          content: get(this, 'customMessage'),
          actionable_id: get(this, 'actionableId'),
          actionable_model: get(this, 'actionableType')
        }
      }
    );
  }
});
