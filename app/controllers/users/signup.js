import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { isBadRequestError } from 'ember-ajax/errors';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { validator, buildValidations } from 'ember-cp-validations';

const { assign, get, getProperties, set, setProperties, computed, Controller, inject: { service } } = Ember;
const passwordPatterns = [/\d/, /[A-Z]/, /[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/];
const Validations = buildValidations({
  fullname: [
    validator('presence', {
      presence: true,
      message: 'Can\'t be blank.'
    }),
    validator('format', {
      regex: /^((?!@).)*$/,
      message: 'Please enter your full name.'
    })
  ],
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
    }),
    validator(
      function(value) {
        return getPasswordStrength(value, passwordPatterns) !== 0 ? true : 'Must include a number or capital letter.';
      }
    )
  ]
});

/**
 * @desc Checks password strength. Each pattern match gets +1 to strength
 * @param {String} password
 * @param {Array<RegEx>} patterns
 * @private
 */
function getPasswordStrength(password, patterns) {
  return patterns.reduce((acc, pattern) => acc + Number(pattern.test(password)), 0);
}

export default Controller.extend(Validations, FlashMessageMixin, {
  session: service(),
  ajax: service(),

  fullName: null,
  email: null,
  password: null,
  loading: false,
  // number, capital letter and special character
  passwordPatterns,

  isInvalid: computed.not('validations.isValid'),
  isDisabled: computed.or('loading', 'isInvalid'),

  passwordStrength: computed('password', 'validations.attrs.password.isValid', function () {
    if ( get(this, 'validations.attrs.password.isValid') === false) {
      return 'weak';
    }

    return this._getPasswordStrength(get(this, 'password'), get(this, 'passwordPatterns')) < 2 ? 'medium' : 'strong';
  }),

  actions: {
    signupAndAuthenticate() {
      if (!get(this, 'isDisabled')) {
        set(this, 'loading', true);
        const credentials = this._buildCredentials();
        /*
          Signup with repositive.
         */
        return get(this, 'ajax').request(ENV.APIRoutes[ENV['ember-simple-auth'].signupRoute], {
          method: 'POST',
          data: credentials
        })
          .then(() => { // signup has suceeded, now login
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

  _getPasswordStrength: getPasswordStrength
});
