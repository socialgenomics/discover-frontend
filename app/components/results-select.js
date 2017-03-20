import Ember from 'ember';

const { Component, set, get } = Ember;

export default Component.extend({
  classNames: ['u-flex', 'u-justify-end', 'u-items-center', 'u-mb3'],

  resultsOptions: [6, 15, 30, 90],

  actions: {
    selectResults(resultsPerPage) { get(this, 'selectResults')(resultsPerPage); }
  }
});
