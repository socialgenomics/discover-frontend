import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';
import { validator } from 'ember-validations';
import { isBadRequestError } from 'ember-ajax/errors';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const{ get, getProperties, set, setProperties, computed, Controller, inject: { service }, observer } = Ember;

export default Controller.extend(EmberValidations, FlashMessageMixin, {
  session: service(),
  ajax: service(),

  fullName: null,
  email: null,
  password: null,
  strength: null,
  showPassword: false,
  loading: false,
  formSubmitted: false,

  validations: {

    fullname: {
      presence: {
        message: 'Can\'t be blank.'
      },
      inline: validator(function() {
        let fn = get(this, 'fullname');
        if (/@/.test(fn)) {
          return 'Please enter your full name.';
        }
      })
    },

    email: {
      presence: {
        message: ''
      },
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'Must be a valid e-mail address.'
      },
      server: true
    },

    password: {
      length: {
        minimum: 8,
        messages: {
          tooShort: 'Must be at least 8 characters long.'
        }
      },
      inline: validator(function() {
        const pw = get(this, 'password');
        if (!/\d/.test(pw) &&
            !/[A-Z]/.test(pw) &&
            !/[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(pw)) {
          return 'Please enter a number or capital letter.';
        }
      })
    }
  },
  isDisabled: computed('loading', 'isValid', function() {
    return get(this, 'loading') || !get(this, 'isValid');
  }),
  type: computed('showPassword', function() {
    return get(this, 'showPassword') ? 'text' : 'password';
  }),

  //TODO: This can be refactored to a component which calls this function on input keypress instead of using an observer.
  passwordStrength: observer('password', function() {
    const numErrors = get(this, 'errors.password.length');
    const pw = get(this, 'password');
    const specials = [
      /\d/.test(pw),
      /[A-Z]/.test(pw),
      /[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(pw)
    ].reduce((prev, curr)=> {
      return Number(curr) + Number(prev);
    });
    if (numErrors === 0 && (specials > 1)) {
      set(this, 'strength', 'strong');
    } else if (numErrors <= 1) {
      set(this, 'strength', 'medium');
    } else {
      set(this, 'strength', 'weak');
    }
  }),

  actions: {
    signupAndAuthenticate: function() {
      if (!get(this, 'isDisabled')) {
        set(this, 'formSubmitted', true);
        const { firstname, lastname } = this._getFirstAndLastNames(get(this, 'fullname'));
        const credentials = getProperties(this, 'email', 'password');
        setProperties(credentials, { firstname, lastname });
        set(this, 'loading', true);
        /*
          Signup with repositive.
         */
        get(this, 'ajax').request(ENV.APIRoutes[ENV['ember-simple-auth'].signupRoute], {
          method: 'POST',
          data: credentials
        })
          .then(resp => { // signup has suceeded, now login
            return get(this, 'session').authenticate('authenticator:repositive', credentials);
          })
          .then(() => {
            setProperties(this, {
              'session.data.firstVisit': true,
              'session.data.displayWelcomeMessage': false,
              'loading': false
            });
          })
          .catch(err => { // error with signup
            set(this, 'loading', false);
            this._displayMessage(err);
          });
      }
    },

    toggleCheckbox: function() {
      this.toggleProperty('showPassword');
    }
  },

  _displayMessage(resp) {
    if (isBadRequestError(resp)) {
      this._addFlashMessage('Error: Invalid email or an account already exists with this email.', 'warning');
    } else {
      this._addFlashMessage(get(resp, 'message'), 'warning');
    }
  },

  _getFirstAndLastNames: function(fullName) {
    const fullNameArray = fullName.split(' ');
    const firstname = fullNameArray.shift();
    const lastname = fullNameArray.join(' ') || '';
    return { firstname, lastname };
  }
});
