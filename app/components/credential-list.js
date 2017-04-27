import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['u-mb2'],

  actions: {
    toggleAddCredentialInput() {
      get(this, 'toggleAddCredentialInput')()
    }
  }
});
