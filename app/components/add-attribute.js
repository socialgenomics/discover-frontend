import Ember from 'ember';

const { Component, get, set, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  session: service(),

  actions: {
    addAttribute() {
      get(this, 'addAttribute')(get(this, 'group'), get(this, 'attributeValue'));
    },
    openAttrInput() { set(this, 'isInputOpen', true); }
  }
});
