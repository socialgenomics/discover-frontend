import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import emailFormatValidator from 'repositive/validations/emailFormatValidator';
import { errorMessages } from 'repositive/validations/validations-config';

const { Component, computed, get, inject: { service }, set, setProperties, Logger } = Ember;
const Validations = buildValidations({
  emailAddress: [
    presenceValidator(errorMessages.blankEmail),
    emailFormatValidator()
  ]
});

export default Component.extend(Validations, {
  ajax: service(),
  store: service(),

  tagName: 'form',
  classNames: ['ta-center'],
  emailAddress: '',
  customMessage: '',
  modelId: null,
  modelType: null,
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
          actionable_id: get(this, 'modelId'),
          actionable_model: get(this, 'modelType')
        }
      }
    );
  },

  _createShareAction(currentUser) {
    const store = get(this, 'store');
    store.findRecord('actionable', get(this, 'modelId'))
      .then(actionable => {
        return store.createRecord('action', {
          actionableId: actionable,
          userId: currentUser,
          type: 'share',
          actionable_model: get(this, 'modelType')
        }).save();
      })
        .catch(Logger.error);
  }
});
