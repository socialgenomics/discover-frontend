import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['c-vertical-menu-link-item'],

  actions: {
    trackClick(link, query, category) {
      get(this, 'metrics').trackEvent({
        category: category,
        action: 'viewed_doc',
        label: link,
        value: query
      });
    }
  }
});
