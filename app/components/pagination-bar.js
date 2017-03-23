import Ember from 'ember';

const { Component, get, set, computed } = Ember;

export default Component.extend({
  classNames: ['u-pt3', 'u-mb3', 'u-flex', 'u-justify-center', 'u-flex-wrap'],

  pageNumbers: [1, 2, 3, 4, 5],

  pages: computed('pageNumbers', 'currentPageNumber', function() {
    return this._updatePageNumberList(get(this, 'pageNumbers'), get(this, 'currentPageNumber'), get(this, 'totalPages'));
  }),

  noPrevPage: computed.equal('currentPageNumber', 1),

  noNextPage: computed('currentPageNumber', 'totalPages', function() {
    return get(this, 'currentPageNumber') >= get(this, 'totalPages');
  }),

  actions: {
    nextPage() { get(this, 'nextPage')(); },
    previousPage() { get(this, 'previousPage')(); },
    goToPage() { get(this, 'goToPage')(); }
  },

  /**
  * @param {array} pages - the list of page numbers.
  */
  _updatePageNumberList(pageNumbers, currentPageNumber, totalPages) {
    let popValue = 1;

    if (currentPageNumber > 2) { popValue = 3; }
    if (currentPageNumber === totalPages - 1) { popValue = 4; } // Penultimate array item
    if (currentPageNumber === totalPages) { popValue = 5; } // End of array - don't allow > totalPages

    return pageNumbers.map(page => page + currentPageNumber - popValue);
  }
});
