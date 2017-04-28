import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['absolute', 'left-0', 'right-0', 'top-0', 'bottom-0', 'bc-overlay-white',
    'u-flex', 'u-justify-center', 'u-content-center', 'px3', 'ta-center'],

  actions: {
    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_datasetDetail_createAccount',
        action: 'link_clicked'
      });
    }
  }
});
