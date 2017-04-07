import Ember from 'ember';

const { Component, computed, get, set } = Ember;

export default Component.extend({
  singleValueAttrs: ['samples', 'pmid'],

  groups: computed('attributes', function() {
    const attributes = get(this, 'attributes') || [];
    const keys = ['assay', 'samples', 'tissue', 'technology', 'pmid'];

    return keys.reduce((keyHash, key) => {
      keyHash[key] = attributes.filterBy('key', key);
      return keyHash;
    }, {});
  }),

  actions: {
    setOpenInput(key) { set(this, 'openInput', key); },
    closeInput() { set(this, 'openInput', null); }
  }
});
