import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import lengthValidator from 'repositive/validations/lengthValidator';
import { lengths, lengthTypes } from 'repositive/validations/validations-config';

const { Component, inject: { service }, Logger, set, get } = Ember;
const Validations = buildValidations({
  [createUserAttrKey('userProfile.bio')]: [
    lengthValidator(lengths.description, lengthTypes.max)
  ],
  [createUserAttrKey('firstname')]: [
    presenceValidator(),
    lengthValidator(lengths.textFieldShort, lengthTypes.max)
  ],
  [createUserAttrKey('lastname')]: [
    presenceValidator(),
    lengthValidator(lengths.textFieldShort, lengthTypes.max)
  ],
  [createUserAttrKey('userProfile.work_organisation')]: lengthValidator(lengths.textFieldLong, lengthTypes.max),
  [createUserAttrKey('userProfile.work_role')]: lengthValidator(lengths.textFieldLong, lengthTypes.max),
  [createUserAttrKey('userProfile.location')]: lengthValidator(lengths.textFieldLong, lengthTypes.max)
});

/**
 * @desc creates full path user attribute key
 * @param {String} key
 * @returns {String}
 */
function createUserAttrKey(key) {
  return `userProfileData.${key}`;
}

export default Component.extend(Validations, {
  store: service(),

  init() {
    this._super(...arguments);

    set(this, 'userAttributes', [
      {
        label: 'Short Bio (max 250 characters)',
        multiline: true,
        placeholder: 'Tell us a bit more what are you working on.',
        userAttributeKey: this._createUserAttrKey('userProfile.bio')
      },
      {
        label: 'First Name',
        placeholder: 'e.g. Christina',
        userAttributeKey: this._createUserAttrKey('firstname')
      },
      {
        label: 'Last Name',
        placeholder: 'e.g. Luckasson',
        userAttributeKey: this._createUserAttrKey('lastname')
      },
      {
        label: 'Affiliation',
        placeholder: 'e.g. Bioinformatician at XYZ Institute',
        userAttributeKey: this._createUserAttrKey('userProfile.work_organisation')
      },
      {
        label: 'Job Role',
        placeholder: 'e.g. Postdoctoral Researcher',
        userAttributeKey: this._createUserAttrKey('userProfile.work_role')
      },
      {
        label: 'Location',
        placeholder: 'e.g. Cambridge, UK',
        userAttributeKey: this._createUserAttrKey('userProfile.location')
      }
    ]);
  },

  actions: {
    save() {
      const userModel = get(this, 'store').peekRecord('user', get(this, 'userId'));
      const userProfileData = get(this, 'userProfileData');

      Object.keys(userProfileData).forEach(attr => set(userModel, attr, userProfileData[attr]));

      return userModel
        .save()
        .then(this._onSaveSuccess.bind(this))
        .catch(this._onSendError.bind(this, userModel));
    }
  },


  /**
   * @desc save success handler
   * @private
   */
  _onSaveSuccess() {
    this._showFlashMessage('success', 'Your profile has been updated.')
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
