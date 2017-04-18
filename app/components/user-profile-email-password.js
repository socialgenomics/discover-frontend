import Ember from 'ember';

const { Component, set } = Ember;

export default Component.extend({
  addingCredential: false,

  actions: {
    toggleAddCredentialInput() {
      set(this, 'addingCredential', true);
    }
  }
});
