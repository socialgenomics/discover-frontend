import Ember from 'ember';

const { Component, set, get } = Ember;

export default Component.extend({
  classNames: ['u-ta-right', 'u-mb3'],

  resultsOptions: [6, 15, 30, 90],

  actions: {
    selectResults(resultsPerPage) { get(this, 'selectResults')(resultsPerPage); }
  }
});
