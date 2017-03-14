import Ember from 'ember';

const { Component, get, set, computed } = Ember;

export default Component.extend({
  classNames: ['u-pt3', 'u-mb2', 'u-flex', 'u-justify-center', 'u-flex-wrap'],

  pageNumbers: [1, 2, 3, 4, 5],

  pages: computed('pageNumbers', 'currentPageNumber', function() {
    return this._updatePageNumberList(get(this, 'pageNumbers'), get(this, 'currentPageNumber'), get(this, 'totalPages'));
  }),

  noPrevPage: computed.equal('currentPageNumber', 1),

  noNextPage: computed('currentPageNumber', 'totalPages', function() {
    if (get(this, 'currentPageNumber') >= get(this, 'totalPages')) { return true; }
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
    const popValue = 0;

    if (currentPageNumber === totalPages) { set(this, 'popValue', 5); } // End of array - don't allow > totalPages
    else if (currentPageNumber === totalPages - 1) { set(this, 'popValue', 4); } // Penultimate array item
    else if (currentPageNumber > 2) { set(this, 'popValue', 3); } // Begninning of array - don't allow 0 and below
    else { set(this, 'popValue', 1); } // Default page numbers

    return pageNumbers.map(page => page + currentPageNumber - get(this, 'popValue'));
  }
});
