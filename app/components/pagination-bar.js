import Ember from 'ember';

const { Component, get, computed } = Ember;

export default Component.extend({
  classNames: ['u-pt3', 'u-mb2', 'u-flex', 'u-justify-center', 'u-flex-wrap'],

  pageNumbers: [1, 2, 3, 4, 5],

  pages: computed('page', function() {
    if (get(this, 'page') % 5 === 0) {
      return this._updatePageNumberList(get(this, 'pageNumbers'));
    }
    return get(this, 'pageNumbers');
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
  _updatePageNumberList(pageNumbers) {
    return pageNumbers.map(arrayElement => arrayElement + 4);
  },
});
