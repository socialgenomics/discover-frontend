import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['u-flex', 'u-justify-end', 'u-items-center'],

  resultsOptions: [6, 15, 30, 90],

  actions: {
    setResultsPerPage(resultsPerPage) { get(this, 'setResultsPerPage')(resultsPerPage); }
  }
});
