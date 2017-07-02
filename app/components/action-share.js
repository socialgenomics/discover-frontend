import Ember from 'ember';

const { Component, set, inject: { service }, get } = Ember;

export default Component.extend({
  session: service(),
  tagName: 'li',
  classNames: ['fc-secondary', 'cursor-pointer'],
  showShareOptionsModal: false,
  showShareEmailModal: false,
  showCreateAccountModal: false,

  init() {
    this._super(...arguments);

    // modal constraints prevents share options modal from bleeding out of the edge of browser window
    set(this, 'shareOptionsModalConstraints', [{ to: 'window', pin: true }]);
  },

  touchEnd() {
    if (get(this, 'session.isAuthenticated')) {
      get(this, 'metrics').trackEvent({
        category: 'discover_homeauth_dataset',
        action: 'share_click',
        label: get(this, 'actionableId'),
        value: true
      });
    } else {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_dataset',
        action: 'share_click',
        label: get(this, 'actionableId'),
        value: true
      });
    }
    this.send('toggleShareOptionsModal');
  },

  click() {
    this.touchEnd();
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
