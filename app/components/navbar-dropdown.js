import Ember from 'ember';
import { later, cancel } from 'ember-runloop';

const { Component, inject: { service }, get } = Ember;

export default Component.extend({
  session: service(),

  classNames: ['c-navbar__profile-dropdown', 'u-border-left', 'u-pl2'],

  actions: {
    prevent() { return false; },

    open(dropdown) {
      if (this.closeTimer) {
        cancel(this.closeTimer);
        this.closeTimer = null;
      } else {
        dropdown.actions.open();
      }
    },
    
    close(dropdown) {
      this.closeTimer = later(() => {
        this.closeTimer = null;
        dropdown.actions.close();
      }, 400);
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
