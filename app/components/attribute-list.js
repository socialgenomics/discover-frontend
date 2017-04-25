import Ember from 'ember';

const { inject: { service }, Component, computed, get, set } = Ember;

export default Component.extend({
  session: service(),

  singleValueAttrs: ['samples'],

  groups: computed('attributes', function() {
    const attributes = get(this, 'attributes') || [];
    const keys = ['assay', 'samples', 'tissue', 'technology', 'pmid'];

    return keys.reduce((keyHash, key) => {
      keyHash[key] = attributes.filterBy('key', key);
      return keyHash;
    }, {});
  }),

  actions: {
    setOpenInput(key) { set(this, 'openInput', key); }, //can change to regular func
    closeInput() { set(this, 'openInput', null); },
    handleAddClick(group) {
      get(this, 'session.isAuthenticated') ?
        this.send('setOpenInput', group) : this.send('toggleCreateAccountModal');
    },
    toggleCreateAccountModal() {
      this.toggleProperty('showCreateAccountModal');
    }
  }
});
