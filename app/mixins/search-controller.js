import Ember from 'ember';
import QP from 'npm:../../query-parser';

const { Mixin, computed, get, set, setProperties } = Ember;

export default Mixin.create({
  queryParams: ['query', 'page', 'resultsPerPage'],
  query: null,
  page: 1,
  resultsPerPage: 6,
  resultsOptions: [6, 18, 30, 90],

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

    goToPage(page) {
      if (page <= get(this, 'totalPages')) {
        set(this, 'page', page);
      }
    },

    addFilter(predicate, text) {
      this._toggleFilter('addFilter', predicate, text);
    },

    removeFilter(predicate, text) {
      this._toggleFilter('removeFilter', predicate, text);
    },

    setResultsPerPage(resultsPerPage) {
      setProperties(this, {
        'resultsPerPage': resultsPerPage,
        'page': 1
      });
      get(this, 'metrics').trackEvent({
        category: 'search_resultsPerPage',
        action: resultsPerPage
      });
    }
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

    // reset current page number each time we change query
    set(this, 'page', 1);
  }
});
