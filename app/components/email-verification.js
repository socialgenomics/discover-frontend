import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import VerificationMixin from 'repositive/mixins/verification';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import emailFormatValidator from 'repositive/validations/emailFormatValidator';
import { errorMessages } from 'repositive/validations/validations-config';
import { getLatestSecondaryCredential } from 'repositive/utils/credentials';

const { Component, get, set, computed, Logger, inject: { service }, isEmpty } = Ember;

const Validations = buildValidations({
  newEmail: [
    presenceValidator(errorMessages.blankEmail),
    emailFormatValidator()
  ]
});

export default Component.extend(FlashMessageMixin, Validations, VerificationMixin, {
  ajax: service(),
  session: service(),
  store: service(),

  classNames: ['u-mb3'],

  loading: false,

  isInvalid: computed.not('validations.isValid'),
  isDisabled: computed.or('isEmailUnchanged', 'isInvalid'),
  isEmailUnchanged: computed('credentials.main_credential.email', 'newEmail', function() {
    const currentEmail = get(this, 'credentials.main_credential.email');
    const newEmail = get(this, 'newEmail');
    return currentEmail === newEmail;
  }),
  newEmail: computed('credentials.main_credential.email', function() {
    return get(this, 'credentials.main_credential.email');
  }),
  pendingCredential: computed('credentials.secondary_credentials.[]', function() {
    const secondaryCredentials = get(this, 'credentials.secondary_credentials');
    if (isEmpty(secondaryCredentials)) { return false; }
    const latestSecondaryCred = getLatestSecondaryCredential(secondaryCredentials);
    if (!get(latestSecondaryCred, 'verified')) {
      return latestSecondaryCred;
    }
    return false;
  }),

  actions: {
    saveNewCredential() {
      const email = get(this, 'credentials.main_credential.email');
      const newEmail = get(this, 'newEmail');

      if (newEmail === email && get(this, 'credentials.is_verified')) {
        this._addFlashMessage('This credential is already associated with this account.', 'success');
        this.send('cancel');
      } else {
        set(this, 'loading', true);
        return this._saveCredential(newEmail);
      }
    },
    sendVerificationEmail(newEmail) {
      return this.sendVerificationEmail(newEmail, get(this, 'ajax'));
    },
    cancel() { get(this, 'toggleAddCredentialInput')(); }
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
    });

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
