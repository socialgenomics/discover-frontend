import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const { get, getProperties, computed, Controller, inject: { service }, set } = Ember;
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
  ],
  password: [
    validator('presence', {
      presence: true,
      message: 'Please provide password.'
    }),
    validator('length', {
      min: 8,
      message: 'Must be at least 8 characters.'
    })
  ]
});

export default Controller.extend(
  Validations,
  {
    session: service(),

    email: null,
    password: null,
    loading: false,

    isInvalid: computed.not('validations.isValid'),
    isDisabled: computed.or('loading', 'isInvalid'),

    actions: {
      submitForm() {
        if (!get(this, 'isDisabled')) {
          set(this, 'loading', true);
          return get(this, 'session')
            .authenticate('authenticator:repositive', getProperties(this, 'email', 'password'))
            .then(this._displayMessage.bind(this))
            .catch(this._displayMessage.bind(this));
        }
      },

      resetPassword() {
        this.transitionToRoute('users.resend-password');
      }
    },

    _displayMessage(resp) {
      set(this, 'loading', false);
      if (resp) {
        const message = get(resp, 'status_code') !== 400 ?
          get(resp, 'message') :
          'Error: Invalid Email. Please check that you have typed your email correctly.';

        if (message) {
          this.flashMessages.add({
            message,
            type: 'warning'
          });
        }
      }
    }
  }
);
