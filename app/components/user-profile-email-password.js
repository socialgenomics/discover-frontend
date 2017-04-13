import Ember from 'ember';

const { Component, set } = Ember;

export default Component.extend({
  addingCredential: false,

  actions: {
    addCredential() {
      set(this, 'addingCredential', true);
    }
  }
});
