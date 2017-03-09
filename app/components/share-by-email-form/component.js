import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { validator, buildValidations } from 'ember-cp-validations';

const { Component, computed, get, inject: { service }, set, setProperties, Logger } = Ember;
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
  store: service(),

  tagName: 'form',
  classNames: ['u-ta-center'],
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
    const currentUser = get(this, 'currentUser');
    if (currentUser) { this._createShareAction(currentUser); }
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
  },

  _createShareAction(currentUser) {
    const store = get(this, 'store');
    store.findRecord('actionable', get(this, 'actionableId'))
      .then(actionable => {
        return store.createRecord('action', {
          actionableId: actionable,
          userId: currentUser,
          type: 'share',
          actionable_model: get(this, 'actionableType')
        }).save();
      })
        .catch(Logger.error);
  }
});
