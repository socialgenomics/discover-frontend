import Ember from 'ember';
import VerificationMixin from 'repositive/mixins/verification';
import { getLatestSecondaryCredential } from 'repositive/utils/credentials';

const { Component, computed, get, isEmpty } = Ember;

export default Component.extend(VerificationMixin, {
  addingCredential: false,

  mainCredentialNotVerified: computed('credentials.main_credential', function() {
    return !get(this, 'credentials.main_credential.verified');
  }),

  pendingCredential: computed('credentials.secondary_credentials.[]', function() {
    const secondaryCredentials = get(this, 'credentials.secondary_credentials');

    if (isEmpty(secondaryCredentials)) { return false; }

    const latestSecondaryCred = getLatestSecondaryCredential(secondaryCredentials);

    if (!get(latestSecondaryCred, 'verified')) { return latestSecondaryCred; }

    return false;
  }),

  actions: {
    toggleAddCredentialInput() { this.toggleProperty('addingCredential'); },
    sendVerificationEmail(newEmail) {
      return this._sendVerificationEmail(newEmail, get(this, 'ajax'));
    }
  }
});
