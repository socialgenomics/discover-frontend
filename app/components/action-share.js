import Ember from 'ember';

const { Component, set, inject: { service }, get } = Ember;

export default Component.extend({
  session: service(),
  tagName: 'li',
  classNames: ['o-list-inline__item','u-tc-secondary'],
  showShareOptionsModal: false,
  showShareEmailModal: false,
  showCreateAccountModal: false,

  // modal constraints prevents share options modal from bleeding out of the edge of browser window
  shareOptionsModalConstraints: [{ to: 'window', pin: true }],

  click() {
    get(this, 'metrics').trackEvent({
      category: 'dataset',
      action: 'share',
      label: get(this, 'actionableId'),
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
