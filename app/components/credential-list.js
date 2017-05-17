import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['u-mb3'],

  actions: {
    toggleAddCredentialInput() {
      get(this, 'toggleAddCredentialInput')()
    }
  }
});
