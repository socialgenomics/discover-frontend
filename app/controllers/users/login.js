import Ember from 'ember';
import EmberValidations from 'ember-validations';
const { get, getProperties, computed, Controller, inject: { service }, set, setProperties, $ } = Ember;

export default Controller.extend(
  EmberValidations,
  {
    session: service(),

    email: null,
    password: null,
    loading: false,
    formSubmitted: false,

    validations: {
      email: {
        presence: {
          message: ' '
        },
        format: {
          with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
          message: 'Must be a valid e-mail address'
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
          $('#login-form').find('input').trigger('change'); // fix for password manager bug

          setProperties(this, {
            loading: true,
            formSubmitted: true
          });

          get(this, 'session')
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
            type: 'warning',
            timeout: 7000,
            class: 'fadeIn'
          });
        }
      }
    }
  }
);

