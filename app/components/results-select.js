import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['u-flex', 'u-justify-end', 'u-items-center'],

  actions: {
    setResultsPerPage(resultsPerPage) { get(this, 'setResultsPerPage')(resultsPerPage); }
  }
});
