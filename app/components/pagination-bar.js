import Ember from 'ember';

export default Ember.Component.extend({
  resultsPerPage: 9,
  totalPages: Ember.computed('totalResults', 'resultsPerPage', function() {
    const resultsPerPage = this.get('resultsPerPage');
    const totalResults = this.get('totalResults');
    return Math.ceil(totalResults / resultsPerPage);
  }),
  currentPageNumber: Ember.computed('currentOffset', 'resultsPerPage', function() {
    const resultsPerPage = this.get('resultsPerPage');
    const offset = this.get('currentOffset') || 0;
    return Math.ceil(offset / resultsPerPage) + 1;
  }),

  actions: {
    nextPage() {
      this.nextPage();
    },
    previousPage() {
      this.previousPage();
    }
  }
});
