import Ember from 'ember';
import QP from 'npm:@repositive/query-parser';
import { createPredicate, isPredicate } from 'repositive/utils/query-array';

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
      const queryArray = qp.fromPhrase(query);
      const toReturn = queryArray
        .filter(node => isPredicate(node))
        .map(filter => `${filter.target}:${filter.value}`);
      debugger;
      return toReturn;
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
      const filter = createPredicate({target: predicate,  value: text});
      this._toggleFilter('add', filter);
    },

    removeFilter(predicate, text) {
      const filter = createPredicate({target: predicate, value: text});
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
   * @param {String} action - QP method name ("add" or "remove")
   * @param {String} predicate
   * @param {String} text
   * @private
   */
  _toggleFilter(action, filter) {
    const qp = get(this, 'QP');
    const query = get(this, 'query');
    const currentQueryTree = qp.fromPhrase(query || '');
    debugger;
    if (action === 'remove') {
      const toRemove = qp.filter(currentQueryTree, node => node.value === filter.value && node.key === filter.key)[0];
      set(this, 'query', qp.toNatural(
        qp.remove(currentQueryTree, toRemove)
      ));
    } else if (action === 'add') {
      set(this, 'query', qp.toNatural(
        currentQueryTree ? qp.and({left: currentQueryTree, right: filter}) : filter
      ));
    }

    // reset current page number each time we change query
    set(this, 'page', 1);
  }
});
