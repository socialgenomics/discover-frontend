import Ember from 'ember';

const { inject: { service }, Component, computed, get, set } = Ember;

export default Component.extend({
  session: service(),

  groups: computed('attributes', function() {
    const attributes = get(this, 'attributes') || [];
    const keys = ['assay', 'samples', 'tissue', 'technology', 'pmid'];

    return keys.reduce((keyHash, key) => {
      keyHash[key] = attributes.filterBy('key', key);
      return keyHash;
    }, {});
  }),

  init() {
    this._super(...arguments);

    set(this, 'singleValueAttrs', ['samples']);
  },

  actions: {
    deleteAction(action) {
      get(this, 'deleteAction')(action);
    },
    closeInput() { set(this, 'openInput', null); },
    handleAddClick(group) {
      get(this, 'session.isAuthenticated') ?
        set(this, 'openInput', group) : this.send('toggleCreateAccountModal');
    },
    toggleCreateAccountModal() {
      this._toggleCreateAccountModal()
    }
  },
  _toggleCreateAccountModal() {
    this.toggleProperty('showCreateAccountModal');
  }
});
