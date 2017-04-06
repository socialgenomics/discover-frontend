import Ember from 'ember';

const { Component, computed, inject: { service }, get, Logger, set, setProperties } = Ember;

export default Component.extend({
  session: service(),

  classNames: ['u-flex u-flex-column u-items-center u-justify-center u-mb2 c-avatar-upload'],
  uploading: false,
  uploadFailed: false,
  reloadFailed: false,

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
    setProperties(this, {
      uploading: false,
      uploadFailed: false,
      reloadFailed: false
    });
  },

  /**
   * @desc file upload error handler
   * @param {Object} error - error response
   * @private
   */
  _handleUploadErrors(error) {
    // TODO: need to improve error detection
    if (error.statusCode !== 200) {
      set(this, 'uploadFailed', true);
    } else {
      set(this, 'reloadFailed', true);
    }

    Logger.error(error);
  }
});