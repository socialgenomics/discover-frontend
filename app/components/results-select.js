import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['u-flex', 'u-justify-end', 'u-items-center', 'u-hide-on-sm-md'],

  actions: {
    setResultsPerPage(dropdown, resultsPerPage) {
      dropdown.actions.close();
      get(this, 'setResultsPerPage')(resultsPerPage);
    }
  }
});
