import Ember from 'ember';

const { Component, set, inject: { service } } = Ember;

export default Component.extend({
  session: service(),

  classNames: ['share-options-button'],
  showShareOptionsModal: false,
  showShareEmailModal: false,
  showCreateAccountModal: false,

  click: function() {
    this.get('metrics').trackEvent({
      category: 'dataset',
      action: 'share',
      label: this.get('dataset.id'),
      value: true
    });

    this.send('toggleShareOptionsModal');
  },

  actions: {
    toggleShareOptionsModal() {
      this.toggleProperty('showShareOptionsModal');
    },

    toggleShareEmailModal() {
      set(this, 'showShareOptionsModal', false);
      this.toggleProperty('showShareEmailModal');
    },

    toggleCreateAccountModal() {
      set(this, 'showShareOptionsModal', false);
      this.toggleProperty('showCreateAccountModal');
    }
  }
});
