import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    addCredential() {
      this.sendAction('addCredential')
    }
  }
});
