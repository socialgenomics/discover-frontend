import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['create-account-call-to-action'],

  actions: {
    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_datasetDetail_createAccount',
        action: 'link_clicked'
      });
    }
  }
});
