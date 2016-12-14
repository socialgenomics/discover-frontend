import Ember from 'ember';

const { Component, computed, get, inject: { service } } = Ember;

export default Component.extend({
  searchService: service('search'),

  classNames: ['pagination-bar'],

  currentPageNumber: computed('searchService.offset', 'searchService.resultsPerPage', function() {
    const offset = get(this, 'searchService.offset');
    const resultsPerPage = get(this, 'searchService.resultsPerPage');
    return Math.ceil((offset / resultsPerPage) || 0) + 1;
  }),

  totalPages: computed('totalResults', 'searchService.resultsPerPage', function() {
    const resultsPerPage = get(this, 'searchService.resultsPerPage');
    const totalResults = get(this, 'totalResults');
    return Math.ceil(totalResults / resultsPerPage);
  }),

  actions: {
    nextPage() {
      const searchService = get(this, 'searchService');
      get(this, 'search')(searchService.getQueryTree(), get(this, 'currentPageNumber') + 1);
    },
    previousPage() {
      const searchService = get(this, 'searchService');
      get(this, 'search')(searchService.getQueryTree(), get(this, 'currentPageNumber') - 1);
    }
  }
});
