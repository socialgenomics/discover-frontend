import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  addingCredential: false,

  actions: {
    toggleAddCredentialInput() { this.toggleProperty('addingCredential'); }
  }
});
