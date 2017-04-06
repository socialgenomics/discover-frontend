import Ember from 'ember';

const { Component, get, set } = Ember;

export default Component.extend({
  tagName: 'form',

  actions: {
    submitForm() {
      this.sendAction('submitForm');
    }
  }
});
