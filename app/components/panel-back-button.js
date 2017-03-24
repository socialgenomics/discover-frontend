import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  actions: {
    trackBackClick() {
      get(this, 'metrics').trackEvent({
        category: 'discover_homeauth_' + get(this, 'route') + '_panel',
        action: 'back_button_clicked'
      });
    }
  }
});
