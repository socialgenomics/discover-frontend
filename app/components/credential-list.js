import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Component, get, set, Logger, inject: { service } } = Ember;

export default Component.extend(FlashMessageMixin, {
  store: service(),

  actions: {
    toggleAddCredentialInput() {
      get(this, 'toggleAddCredentialInput')()
    },

    makePrimary(email) {
      return get(this, 'store').query('credential', {
        'where.email': email
      })
        .then(credential => {
          set(credential, 'primary', true)
        })
        .catch(Logger.error);
    },

    deleteCredential(credential) {
      credential.destroyRecord()
      .then(() => {
        this._addFlashMessage('The credential has been deleted successfully.', 'success');
      })
      .catch(Logger.error);
    }
  }
});
