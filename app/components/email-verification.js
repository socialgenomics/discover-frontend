import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import emailFormatValidator from 'repositive/validations/emailFormatValidator';
import { errorMessages } from 'repositive/validations/validations-config';
import { getLatestSecondaryCredential } from 'repositive/utils/credentials';

const { Component, get, set, computed, Logger, inject: { service } } = Ember;

const Validations = buildValidations({
  newEmail: [
    presenceValidator(errorMessages.blankEmail),
    emailFormatValidator()
  ]
});

export default Component.extend(FlashMessageMixin, Validations, {
  session: service(),
  ajax: service(),
  store: service(),

  classNames: ['u-mb3'],

  loading: false,
  isNotChanged: true,

  isInvalid: computed.not('validations.isValid'),
  isDisabled: computed.or('isNotChanged', 'isInvalid'),
  newEmail: computed('credentials.main_credential.email', function() {
    return get(this, 'credentials.main_credential.email');
  }),

  pendingCredential: computed('credentials.secondary_credentials.[]', function() {
    const secondaryCredentials = get(this, 'credentials.secondary_credentials');
    const latestSecondaryCred = getLatestSecondaryCredential(secondaryCredentials);
    if (!get(latestSecondaryCred, 'verified')) {
      return latestSecondaryCred;
    }
    return false;
  }),

  keyUp() {
    if (get(this, 'credentials.main_credential.email') !== get(this, 'newEmail')) { set(this, 'isNotChanged', false); }
  },

  actions: {
    saveNewCredential() {
      const email = get(this, 'credentials.main_credential.email');
      const newEmail = get(this, 'newEmail');

      if (newEmail === email && get(this, 'credentials.is_verified')) {
        set(this, 'addingCredential', false);
        this._addFlashMessage('This credential is already associated with this account.', 'success');
      } else {
        set(this, 'loading', true);
        return this._saveCredential(newEmail);
      }
    },
    sendVerificationEmail(newEmail) { return this._sendVerificationEmail(newEmail); },
    cancel() { set(this, 'addingCredential', false); }
  },

  /**
   * @desc create a new credential record for the user
   * @param {string} newEmail
   * @private
   */
  _saveCredential(newEmail) {
    const credential = get(this, 'store').createRecord('credential', {
      email: newEmail,
      primary: false,
      provider: 'email',
      userId: get(this, 'session.authenticatedUser'),
      verified: false
    })

    return credential
      .save()
      .then(newCred => {
        get(this, 'credentials.secondary_credentials').addObject(newCred);
        return this._sendVerificationEmail(newEmail);
      })
      .catch(this._onSaveError.bind(this, credential))
      .finally(set(this, 'loading', false));
  },

  /**
  * @desc send the verification email to the new address
  * @param {string} newEmail
  * @private
  */
  _sendVerificationEmail(newEmail) {
    get(this, 'ajax')
      .request(ENV.APIRoutes['verify-email-resend'] + `/${newEmail}`, { method: 'GET' })
      .then(this._onSendSuccess.bind(this))
      .catch(this._onSendError.bind(this));
  },

  /**
   * @desc send success handler
   * @private
   */
  _onSendSuccess() {
    this._addFlashMessage('We have sent a verification email to your inbox', 'success');
  },

  /**
   * @desc send error handler
   * @private
   */
  _onSendError(err) {
    Logger.error(err);
    this._addFlashMessage('Sorry, we couldn\'t send you the link. Please try again later.', 'warning');
  },

  /**
   * @desc save error handler
   * @param {Ember.DS.Model} userModel
   * @param {Error} error
   * @private
   */
  _onSaveError(model, error) {
    model.rollbackAttributes();
    Logger.error(error);
    this._addFlashMessage('Sorry. There was a problem saving your new email. Please try again later.', 'warning')
  }
});
