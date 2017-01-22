import Ember from 'ember';

const { Component, inject: { service }, $, get } = Ember;

export default Component.extend({
  session: service(),
  tagName: 'footer',
  classNames: ['platform-footer'],
  actions: {
    trackFooterLink(link) {
      if (get(this, 'session.isAuthenticated')) {
        this.get('metrics').trackEvent({
          category: 'discover_homeauth_footer',
          action: 'link_clicked',
          label: link
        });
      } else {
        this.get('metrics').trackEvent({
          category: 'discover_openpage_footer',
          action: 'link_clicked',
          label: link
        });
      }
    }
  }
});
