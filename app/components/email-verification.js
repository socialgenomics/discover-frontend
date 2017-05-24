import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import VerificationMixin from 'repositive/mixins/verification';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import emailFormatValidator from 'repositive/validations/emailFormatValidator';
import { errorMessages } from 'repositive/validations/validations-config';

const { Component, get, set, computed, Logger, inject: { service } } = Ember;

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

  classNames: ['mb4'],

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

  actions: {
    saveNewCredential() {
      const newEmail = get(this, 'newEmail');
      const existingCredential = this._getExistingCredential(newEmail);
      if (existingCredential) {
        //If it's not verified -> send email
        if (!get(existingCredential, 'verified')) {
          return this._sendVerificationEmail(newEmail);
        }
        //if already primary
        //shouldn't never be called due to isEmailUnchanged computed prop
        if (get(existingCredential, 'primary')) {
          this._addFlashMessage(`You're already using this email`, 'warning');
          return this.send('cancel');
        }
        debugger;
        return this._makeCredentialPrimary(existingCredential.id);
      } else {
        set(this, 'loading', true);
        return this._saveCredential(newEmail);
      }
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
        get(this, 'pushToSecondaryCreds')(newCred);
        return this._sendVerificationEmail(newEmail);
      })
      .then(this.send('cancel'))
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
  },

  /**
   * @desc checks email against user's existing emails
   * @param {String} email
   * @returns {Object | Boolean}
   * @private
   */
  _getExistingCredential(email) {
    const existingCredential = get(this, 'store').peekAll('credential')
      .findBy('email', email);
    return existingCredential ? existingCredential : false;
  }
});
