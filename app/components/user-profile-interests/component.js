import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Component, inject: { service }, Logger, get, set, setProperties } = Ember;

export default Component.extend(FlashMessageMixin, {
  store: service(),

  isOpen: false,
  newInterest: '',

  init() {
    this._super(...arguments);

    set(this, 'editInterests', [...(get(this, 'interests') || [])]);
  },

  actions: {
    /**
     * @desc removes interest
     * @param {String} name
     */
    removeInterest(name) {
      this._saveChanges(get(this, 'editInterests').removeObject(name));
    },

    /**
     * @desc adds interest
     * @param {String} name
     */
    addInterest(name) {
      this._saveChanges(get(this, 'editInterests').addObject(name));
    },

    /**
     * @desc hides add interest input and resets it state
     */
    hideInput() {
      setProperties(this, { isOpen: false, newInterest: '' });
    },

    /**
     * @desc shows add interest input
     */
    showInput() {
      set(this, 'isOpen', true);
    }
  },

  /**
   * @desc saves changes to backend
   * @param {Array<String>} interests
   * @private
   */
  _saveChanges(interests) {
    const userModel = get(this, 'store').peekRecord('user', get(this, 'userId'));

    set(userModel, 'profile.interests', interests);
    this.send('hideInput');

    userModel
      .save()
      .then(this._onSaveSuccess.bind(this))
      .catch(this._onSaveError.bind(this, userModel));
  },

  /**
   * @desc save success handler
   * @private
   */
  _onSaveSuccess() {
    this._addFlashMessage('Your interests have been updated.', 'success');
  },

  /**
   * @desc save error handler
   * @param {Ember.DS.Model} userModel
   * @param {Error} error
   * @private
   */
  _onSaveError(userModel, error) {
    userModel.rollbackAttributes();
    set(this, 'editInterests', get(userModel, 'profile.interests'));
    Logger.error(error);
    this._addFlashMessage('Sorry. There was a problem with updating your interests.', 'warning');
  }
});
