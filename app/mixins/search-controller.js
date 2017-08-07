import Ember from 'ember';
import QP from 'npm:@repositive/query-parser';

const { Mixin, computed, get, set, setProperties } = Ember;

export default Mixin.create({
  queryParams: ['query', 'page', 'resultsPerPage'],
  query: null,
  page: 1,
  resultsPerPage: 30,
  resultsOptions: [6, 18, 30, 90],

  totalPages: computed('model.meta.total', 'resultsPerPage', function () {
    return Math.ceil(get(this, 'model.meta.total') / get(this, 'resultsPerPage'));
  }),

  QP: computed(function () {
    return QP;
  }),

  activeFilters: computed('query', function () {
    const query = get(this, 'query');
    if (query) {
      const qp = get(this, 'QP');
      const queryTree = qp.fromNatural(query);
      return qp.filter(queryTree, (node) => qp.isPredicate(node)).map(filter => `${filter.predicate}:${filter.value}`);
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
      const filter = get(this, 'QP').predicate({key: predicate,  value: text});
      this._toggleFilter('add', filter);
    },

    removeFilter(predicate, text) {
      const filter = get(this, 'QP').predicate({key: predicate, value: text});
      this._toggleFilter('remove', filter);
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
  _toggleFilter(action, filter) {
    const qp = get(this, 'QP');
    const query = get(this, 'query');
    const currentQueryTree = qp.fromNatural(query || '');

    if (action === 'remove') {
      set(this, 'query', query.toNatural(
        qp.remove(currentQueryTree, filter)
      ));
    } else if (action === 'add') {
      set(this, 'query', query.toNatural(
        qp.and({left: currentQueryTree, right: filter})
      ));
    }

    // reset current page number each time we change query
    set(this, 'page', 1);
  }
});
