import Ember from 'ember';

const { computed, Logger, Mixin, set, get } = Ember;

/**
 * @desc creates computed property function
 * @param {Array} editableAttrs
 * @returns {Function}
 */
export function createIsDirtyComputed(editableAttrs) {
  return computed(...editableAttrs.map(createUserAttrKey), function () {
    const initialValues = get(this, 'initialEditableAttrsValues');

    // Weak comparison is used on purpose.
    // If attr is undefined and user did focus on the input field its value is changes to empty string.
    return this._getEditableAttributeValues(editableAttrs).some((val, i) => !!val != !!initialValues[i]);
  });
}

/**
 * @desc creates full path user attribute key
 * @param {String} key
 * @returns {String}
 */
export function createUserAttrKey(key) {
  return `userProfileData.${key}`;
}

export default Mixin.create({
  initialEditableAttrsValues: null,

  actions: {
    save() {
      const userModel = get(this, 'store').peekRecord('user', get(this, 'userId'));
      const userProfileData = get(this, 'userProfileData');

      Object.keys(userProfileData).forEach(attr => set(userModel, attr, userProfileData[attr]));

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
    this._addFlashMessage('Your profile has been updated.', 'success');
    get(this, 'transitionToProfile')(get(this, 'userId'));
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
  },

  /**
   * @desc gets values of editable properties
   * @params {Array} editableAttrs
   * @returns {Array}
   * @private
   */
  _getEditableAttributeValues(editableAttrs) {
    return editableAttrs.map(key => get(this, createUserAttrKey(key)));
  }
});
