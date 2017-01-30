import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['c-call-to-action-banner', 'u-flex', 'u-justify-center', 'u-items-center', 'u-pt2'],

  actions: {
    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_datasetBanner_searchNow',
        action: 'link_clicked'
      });
    }
  }
});
