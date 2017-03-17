import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  actions: {
    addAttribute() {
      get(this, 'addAttribute')(get(this, 'group'), get(this, 'attributeValue'));
      get(this, 'closeInput')();
    },
    cancel() { get(this, 'closeInput')(); }
  }
});
