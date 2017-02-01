import Ember from 'ember';

const { Component, inject: { service }, get } = Ember;

export default Component.extend({
  session: service(),

  classNames: ['u-border-left', 'u-pl2'],

  actions: {
    close(dropdown) {
      dropdown.actions.close();
    },

    logout() {
      this.flashMessages.clearMessages();
      get(this, 'metrics').trackEvent({
        category: 'discover_homeauth_navbar',
        action: 'logout',
        label: get(this, 'session.data.authenticatedUser.main_email')
      });
      get(this, 'session').invalidate();
    }
  }
});
