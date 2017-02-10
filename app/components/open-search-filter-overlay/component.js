import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({

  classNames: ['c-overlay', 'u-bc-overlay-grey', 'u-ta-center', 'u-py5', 'u-pos-top0', 'u-pos-left0'],
// =======
//   classNames: ['c-overlay', 'u-bc-overlay-light-bluegrey', 'u-ta-center', 'u-py4', 'u-pos-top0', 'u-pos-left0'],
// >>>>>>> CSS-Refactor

  actions: {
    trackLinkEvent() {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_searchFilters_createAccount',
        action: 'text_link_clicked'
      });
    }
  }
});
