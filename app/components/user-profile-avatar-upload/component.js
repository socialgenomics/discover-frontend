import Ember from 'ember';

const { Component, computed, inject: { service }, get, Logger, set } = Ember;

export default Component.extend({
  session: service(),

  classNames: ['u-flex u-justify-center u-mb2 c-avatar-upload'],
  uploading: false,

  headers: computed('session.session.content.authenticated.token', function () {
    const authToken = get(this, 'session.session.content.authenticated.token');

    return authToken ? { Authorization: `JWT ${authToken}` } : {};
  }),

  actions: {
    uploadImage(file) {
      set(this, 'uploading', true);

      file
        .upload('/avatar', { headers: get(this, 'headers') })
        .then(() => get(this, 'reloadModel')())
        .then(this._resetUploadingState.bind(this))
        .catch(this._handleUploadErrors.bind(this));
    }
  },

  /**
   * @desc resets component to default state after upload is finished
   * @private
   */
  _resetUploadingState() {
    set(this, 'uploading', false);
  },

  /**
   * @desc file upload error handler
   * @param {Object} error - error response
   * @private
   * @todo: We should add some error state in the UI
   */
  _handleUploadErrors(error) {
    this._resetUploadingState();
    Logger.error(error);
  }
});
