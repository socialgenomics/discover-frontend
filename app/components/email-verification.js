import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
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

export function verifyEmail() {
  const email = get(this, 'credential.main_credential.email');
  const newEmail = get(this, 'newEmail');

  if (newEmail === email && get(this, 'credential.is_verified')) {
    set(this, 'addingCredential', false);
    this._addFlashMessage('This email has already been verified.', 'success');
  } else {
    set(this, 'loading', true);
    get(this, 'ajax').request(ENV.APIRoutes['verify-email-resend'] + `/${newEmail}`, { method: 'GET' })
      .then(() => {
        set(this, 'sentEmail', true);
        this._addFlashMessage('We have sent a verification email to your inbox', 'success');
      })
      .catch((err) => {
        Logger.error(err);
        this._addFlashMessage('Sorry, we couldn\'t send you the link. Please try again later.', 'warning');
      });
  }
}

export function saveCredential() {
  const email = get(this, 'credential.main_credential.email');
  const newEmail = get(this, 'newEmail');

  if (newEmail === email && get(this, 'credential.is_verified')) {
    set(this, 'addingCredential', false);
    this._addFlashMessage('This credential is already associated with this account.', 'success');
  } else {
    set(this, 'loading', true);
    return get(this, 'store').query('credential', {
      'where.user_id': get(this, 'session.data.authenticated.user.id')
    })
      .then(credentials => {
        get(this, 'store').createRecord('credential', {
          userId: get(this, 'session.authenticatedUser'),
          email: newEmail,
          primary: false,
          provider: 'email',
          verified: false
        }).save()
          .then(this._onSaveSuccess.bind(this))
          .catch(this._onSaveError.bind(this, credentials));
      })
      .catch(error => {
        set(this, 'loading', false);
        Logger.error(error);
      });
  }
}

export default Component.extend(FlashMessageMixin, Validations, {
  session: service(),
  ajax: service(),
  store: service(),

  classNames: ['u-mb3'],

  loading: false,
  sentEmail: false,
  addingCredential: false,

  newEmail: computed('credential.main_credential.email', function() {
    return get(this, 'credential.main_credential.email');
  }),

  isNotChanged: true,
  isInvalid: computed.not('validations.isValid'),
  isDisabled: computed.or('isNotChanged', 'isInvalid'),

  keyUp() {
    if (get(this, 'credential.main_credential.email') != get(this, 'newEmail')) { set(this, 'isNotChanged', false); }
  },

  actions: {
    resendVerifyEmail: verifyEmail,
    saveNewCredential: saveCredential,

    addCredential() {
      set(this, 'addingCredential', true);
    }
  },

  /**
   * @desc save success handler
   * @private
   */
  _onSaveSuccess() {
    this._showFlashMessage('success', 'Your credential has been added to your account.');
    set(this, 'addingCredential', false);
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
    this._showFlashMessage('warning', 'Sorry. There was a problem saving your changes.');
  },

  /**
   * @desc adds flash message
   * @param {String} type
   * @param {String} message
   * @private
   */
  _showFlashMessage(type, message) {
    this.flashMessages.add({ message, type });
  }
});
