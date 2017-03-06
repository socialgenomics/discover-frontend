import Ember from 'ember';
import QP from 'npm:../../query-parser';

const { Mixin, computed, get, set } = Ember;

export default Mixin.create({
  queryParams: ['query', 'page', 'resultsPerPage'],
  query: null,
  page: 1,
  resultsPerPage: 6,
  pageNumbers: [1, 2, 3, 4, 5],

  pages: computed('page', function() {
    if (get(this, 'page') % 5 === 0) {
      console.log('5');
      return this._updatePagesList(get(this, 'pageNumbers'));
    }
    return get(this, 'pageNumbers');
  }),

  totalPages: computed('model.meta.total', 'resultsPerPage', function () {
    return Math.ceil(get(this, 'model.meta.total') / get(this, 'resultsPerPage'));
  }),

  QP: computed(function () {
    return QP;
  }),

  activeFilters: computed('query', function () {
    if (get(this, 'query')) {
      const qp = get(this, 'QP');
      const queryTree = qp.parseString(get(this, 'query'));

      return qp.getFilters(queryTree).map(filter => `${filter.predicate}:${filter.text}`);
    }
    return [];
  }),

  actions: {
    nextPage() {
      this.incrementProperty('page');
    },

    previousPage() {
      this.decrementProperty('page');
    },

    thisPage(page) {
      set(this, 'page', page);
    },

    addFilter(predicate, text) {
      this._toggleFilter('addFilter', predicate, text);
    },

    removeFilter(predicate, text) {
      this._toggleFilter('removeFilter', predicate, text);
    }
  },

  /**
  * @param {array} pages - the list of page numbers.
  */
  _updatePagesList(pages) {
    return pages.map(arrayElement => arrayElement + 4);
  },

  /**
   *
   * @param {String} action - QP method name ("addFilter" or "removeFilter")
   * @param {String} predicate
   * @param {String} text
   * @private
   */
  _toggleFilter(action, predicate, text) {
    const qp = get(this, 'QP');
    const query = get(this, 'query');
    const currentQueryTree = query ? qp.parseString(query) : '';

    set(
      this,
      'query',
      qp.toBoolString(
        qp[action](currentQueryTree, predicate, text)
      )
    );
  }
});
