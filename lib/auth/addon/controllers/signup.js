import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { isBadRequestError } from 'ember-ajax/errors';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import emailFormatValidator from 'repositive/validations/emailFormatValidator';
import lengthValidator from 'repositive/validations/lengthValidator';
import passwordFormatValidator from 'repositive/validations/passwordFormatValidator';
import { errorMessages, lengths, lengthTypes } from 'repositive/validations/validations-config';

const { assign, get, getProperties, set, setProperties, computed, Controller, inject: { service } } = Ember;
const passwordPatterns = [/\d/, /[A-Z]/, /[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/, /^.{8,}$/];
const Validations = buildValidations({
  fullname: presenceValidator(),
  email: [
    presenceValidator(errorMessages.blankEmail),
    emailFormatValidator()
  ],
  password: [
    presenceValidator(errorMessages.blankPassword),
    lengthValidator(lengths.password, lengthTypes.min),
    passwordFormatValidator()
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
    const score = this._getPasswordStrength(get(this, 'password'), get(this, 'passwordPatterns'));

    if (score >= 1 && score <= 2) {
      return 'medium';
    } else if (score > 2 && get(this, 'validations.attrs.password.isValid')) {
      return 'strong';
    } else {
      return 'weak';
    }
  }),

  actions: {
    signupAndAuthenticate() {
      this._addFlashMessage('TEST', 'warning');

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
