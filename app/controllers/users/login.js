import Ember from 'ember';
import EmberValidations from 'ember-validations';
const { get, getProperties, computed, Controller, inject: { service }, set } = Ember;

export default Controller.extend(
  EmberValidations,
  {
    session: service(),

    email: null,
    password: null,
    loading: false,

    validations: {
      email: {
        presence: {
          message: ' '
        },
        format: {
          with: /^([\w\-\.\+]+)@((?:[\w\-\.]+)(?:\.[a-zA-Z]{2,}))$/,
          message: 'Must be a valid e-mail address.'
        },
        server: true // must be last - unknown bug
      },
      password: {
        presence: {
          message: ' '
        },
        length: {
          minimum: 8,
          messages: { tooShort: 'Must be at least 8 characters.' }
        },
        server: true // must be last - unknown bug
      }
    },

    isDisabled: computed('loading', 'isValid', function() {
      return get(this, 'loading') || !get(this, 'isValid');
    }),

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
