import Ember from 'ember';
import { getLatestSecondaryCredential } from 'repositive/utils/credentials';

const { Component, computed, get, isEmpty } = Ember;

export default Component.extend({
  addingCredential: false,

  mainCredentialNotVerified: computed('credentials.main_credential', function() {
    return !get(this, 'credentials.main_credential.verified');
  }),

  pendingCredential: computed('credentials.secondary_credentials.[]', function() {
    const secondaryCredentials = get(this, 'credentials.secondary_credentials');
    if (isEmpty(secondaryCredentials)) { return false; }
    const latestSecondaryCred = getLatestSecondaryCredential(secondaryCredentials);
    if (!get(latestSecondaryCred, 'verified')) {
      return latestSecondaryCred;
    }
    return false;
  }),

  actions: {
    toggleAddCredentialInput() { this.toggleProperty('addingCredential'); }
  }
});
