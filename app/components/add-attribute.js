import Ember from 'ember';

const { Component, get, set, inject: { service } } = Ember;

export default Component.extend({
  store : service(),

  actions: {
    addAttribute() {
      get(this, 'attributeValue');
    },
    openAttrInput() {
      set(this, 'isInputOpen', true);
    }
  },

  _createAttributeAction() {
    //need the actionableId
    get(this, 'store')
      // .createRecord('action', {
      //
      // })
  }
});
