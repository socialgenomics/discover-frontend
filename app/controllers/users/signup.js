import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';
import { validator } from 'ember-validations';
import { isBadRequestError } from 'ember-ajax/errors';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const{ assign, get, getProperties, set, setProperties, computed, Controller, inject: { service } } = Ember;

export default Controller.extend(EmberValidations, FlashMessageMixin, {
  session: service(),
  ajax: service(),

  fullName: null,
  email: null,
  password: null,
  showPassword: false,
  loading: false,
  // number, capital letter and special character
  passwordPatterns: [/\d/, /[A-Z]/, /[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/],

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
        with: /^([\w\-\.\+]+)@((?:[\w\-\.]+)(?:\.[a-zA-Z]{2,}))$/,
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
        if (get(this, '_getPasswordStrength')(get(this, 'password'), get(this, 'passwordPatterns')) === 0) {
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

  strength: computed('password', 'errors.password.length', function () {
    if ( get(this, 'errors.password.length') > 0) {
      return 'weak';
    }

    return this._getPasswordStrength(get(this, 'password'), get(this, 'passwordPatterns')) < 2 ? 'medium' : 'strong';
  }),

  actions: {
    signupAndAuthenticate() {
      if (!get(this, 'isDisabled')) {
        set(this, 'loading', true );
        const credentials = this._buildCredentials();
        /*
          Signup with repositive.
         */
        console.log("====SIGNED UP====");
        // get(this, 'ajax').request(ENV.APIRoutes[ENV['ember-simple-auth'].signupRoute], {
        //   method: 'POST',
        //   data: credentials
        // })
        //   .then(resp => { // signup has suceeded, now login
        //     return get(this, 'session').authenticate('authenticator:repositive', credentials);
        //   })
        //   .then(() => {
        //     setProperties(this, {
        //       'session.data.firstVisit': true,
        //       'session.data.displayWelcomeMessage': false,
        //       'loading': false
        //     });
        //   })
        //   .catch(err => { // error with signup
        //     set(this, 'loading', false);
        //     this._displayMessage(err);
        //   });
      }
    },

    toggleCheckbox() {
      this.toggleProperty('showPassword');
    }
  },

  _buildCredentials() {
    return assign(
      {},
      this._getFirstAndLastNames(get(this, 'fullname')),
      getProperties(this, 'email', 'password')
    );
  },

  _displayMessage(resp) {
    if (isBadRequestError(resp)) {
      this._addFlashMessage('Error: Invalid email or an account already exists with this email.', 'warning');
    } else {
      this._addFlashMessage(get(resp, 'message'), 'warning');
    }
  },

  _getFirstAndLastNames(fullName) {
    const fullNameArray = fullName.split(' ');
    const firstname = fullNameArray.shift();
    const lastname = fullNameArray.join(' ') || '';
    return { firstname, lastname };
  },

  /**
   * @desc Checks password strength. Each pattern match gets +1 to strength
   * @param {String} password
   * @param {Array<RegEx>} patterns
   * @private
   */
  _getPasswordStrength(password, patterns) {
    return patterns.reduce((acc, pattern) => acc + Number(pattern.test(password)), 0);
  }
});
