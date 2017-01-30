import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['c-overlay', 'u-bc-overlay-white', 'u-flex', 'u-justify-center', 'u-pt3'],

  actions: {
    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_datasetDetail_createAccount',
        action: 'link_clicked'
      });
    }
  }
});
