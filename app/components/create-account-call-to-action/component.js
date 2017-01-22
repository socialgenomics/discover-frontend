import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['create-account-call-to-action'],

  actions: {
    trackLinkEvent() {
      this.get('metrics').trackEvent({
        category: 'discover_openpage_datasetDetail_createAccount',
        action: 'link_clicked'
      });
    }
  }
});
