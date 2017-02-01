import Ember from 'ember';

const { Component, inject: { service }, get } = Ember;

export default Component.extend({
  classNames: ['u-flex','u-self-stretch','u-items-center','u-justify-center','u-border-left','u-pl2'],
  session: service(),
  actions: {
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
