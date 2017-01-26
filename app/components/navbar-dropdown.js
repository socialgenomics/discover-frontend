import Ember from 'ember';

const { Component, inject: { service }, $, get } = Ember;

export default Component.extend({
  session: service(),
  didRender() {
    this._super(...arguments);
    //dropdown initialization
    $('.dropdown-button').dropdown({
      inDuration: 500,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on click
      alignment: 'right', // Aligns dropdown to left or right edge (works with constrain_width)
      gutter: 0, // Spacing from edge
      belowOrigin: true // Displays dropdown below the button
    });
  },
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
