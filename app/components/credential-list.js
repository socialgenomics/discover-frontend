import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['mb4'],

  actions: {
    toggleAddCredentialInput() {
      get(this, 'toggleAddCredentialInput')()
    }
  }
});
