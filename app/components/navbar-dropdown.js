import Ember from 'ember';

const { Component, inject: { service }, get } = Ember;

export default Component.extend({
  classNames: ['flex', 'self-stretch', 'flex-shrink-none', 'items-center', 'justify-center', 'u-hv-bc-very-light-grey'],
  session: service(),
  actions: {
    close(dropdown) {
      dropdown.actions.close();
    },
    closeAndTrack(dropdown, trackingLabel) {
      dropdown.actions.close();
      get(this, 'trackCreateAccount')(trackingLabel);
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
