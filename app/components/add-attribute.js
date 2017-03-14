import Ember from 'ember';

const { Component, set } = Ember;

export default Component.extend({
  actions: {
    openAttrInput() {
      set(this, 'isInputOpen', true);
    }
  }
});
