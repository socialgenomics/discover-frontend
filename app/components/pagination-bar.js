import Ember from 'ember';

const { Component, computed, get, inject: { service } } = Ember;

export default Component.extend({
  searchService: service('search'),

  classNames: ['pagination-bar'],
  // totalPages: computed('totalResults', 'resultsPerPage', function() {
  //   const resultsPerPage = get(this, 'resultsPerPage');
  //   const totalResults = get(this, 'totalResults');
  //   return Math.ceil(totalResults / resultsPerPage);
  // }),
  // currentPageNumber: computed('currentOffset', 'resultsPerPage', function() {
  //   const resultsPerPage = get(this, 'resultsPerPage');
  //   const offset = get(this, 'currentOffset') || 0;
  //   return Math.ceil(offset / resultsPerPage) + 1;
  // }),

  actions: {
    nextPage() {
      const searchService = get(this, 'searchService');
      get(this, 'search')(searchService.getQueryString(), searchService.getPageNumberFromOffset() + 1);
    },
    previousPage() {
      const searchService = get(this, 'searchService');
      get(this, 'search')(searchService.getQueryString(), searchService.getPageNumberFromOffset() - 1);
    }
  }
});
