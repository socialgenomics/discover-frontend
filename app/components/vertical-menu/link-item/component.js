import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['c-help-link'],

  actions: {
    trackHelp(helpLink, helpQuery) {
      get(this, 'metrics').trackEvent({
        category: 'help_doc_link',
        action: 'viewed_doc',
        label: helpLink,
        value: helpQuery
      });
    }
  }
});
