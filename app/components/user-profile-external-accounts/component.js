// TODO: change into real social account linking component with OAuth validation
// This code is temporary copy pase logic from profile details component

import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import urlFormatValidator from 'repositive/validations/urlFormatValidator';
import { errorMessages, patterns } from 'repositive/validations/validations-config';
import { validator } from 'ember-cp-validations';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Component, inject: { service }, Logger, set, get, isEmpty } = Ember;
const Validations = buildValidations({
  [createUserAttrKey('profile.accounts.googlePlus')]: urlFormatValidator(),
  [createUserAttrKey('profile.accounts.linkedIn')]: urlFormatValidator(),
  [createUserAttrKey('profile.accounts.researchGate')]: urlFormatValidator(),
  [createUserAttrKey('profile.accounts.orcid')]: urlFormatValidator(),
  [createUserAttrKey('profile.accounts.twitter')]: validator('format', {
    regex: patterns.twitter,
    allowBlank: true,
    message: errorMessages.invalidTwitterHandle
  })
});

/**
 * @desc creates full path user attribute key
 * @param {String} key
 * @returns {String}
 */
function createUserAttrKey(key) {
  return `userProfileData.${key}`;
}

export default Component.extend(Validations, FlashMessageMixin, {
  store: service(),

  init() {
    this._super(...arguments);

    set(this, 'userAttributes', [
      {
        label: 'Google+',
        userAttributeKey: this._createUserAttrKey('profile.accounts.googlePlus'),
        placeholder: 'e.g. https://plus.google.com/112233445566778899000'
      },
      {
        label: 'LinkedIn',
        userAttributeKey: this._createUserAttrKey('profile.accounts.linkedIn'),
        placeholder: 'e.g. http://www.linkedin.com/in/christinaLuckasson'
      },
      {
        label: 'Twitter',
        userAttributeKey: this._createUserAttrKey('profile.accounts.twitter'),
        placeholder: 'e.g. @christinaLuckasson'
      },
      {
        label: 'Research Gate',
        userAttributeKey: this._createUserAttrKey('profile.accounts.researchGate'),
        placeholder: 'e.g. https://www.researchgate.net/profile/Christina_Luckasson'
      },
      {
        label: 'ORCID',
        userAttributeKey: this._createUserAttrKey('profile.accounts.orcid'),
        placeholder: 'e.g. https://orcid.org/0000-0000-0000-0000'
      }
    ]);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (isEmpty(get(this, 'userProfileData.profile.accounts'))) {
      set(this, 'userProfileData.profile.accounts', {});
    }
  },

  actions: {
    save() {
      const userModel = get(this, 'store').peekRecord('user', get(this, 'userId'));
      const userProfileData = get(this, 'userProfileData');
      debugger;
      Object.keys(userProfileData).forEach(attr => set(userModel, attr, userProfileData[attr]));
      debugger;
      return userModel
        .save()
        .then(this._onSaveSuccess.bind(this))
        .catch(this._onSaveError.bind(this, userModel));
    }
  },


  /**
   * @desc save success handler
   * @private
   */
  _onSaveSuccess() {
    this._addFlashMessage('Your external accounts have been updated.', 'success');
  },

  /**
   * @desc save error handler
   * @param {Ember.DS.Model} userModel
   * @param {Error} error
   * @private
   */
  _onSaveError(userModel, error) {
    userModel.rollbackAttributes();
    Logger.error(error);
    this._addFlashMessage('Sorry. There was a problem saving your changes.', 'warning');
  },

  /**
   * @desc wrapper for private function for creating correct key path to user property (here just for testing purpose)
   * @param {String }key
   * @returns {String}
   * @private
   */
  _createUserAttrKey(key) {
    return createUserAttrKey(key);
  }
});
