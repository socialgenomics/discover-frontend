import Ember from 'ember';
import QP from 'npm:../../query-parser';

const { Mixin, computed, inject: { service }, get, set } = Ember;

export default Mixin.create({
  ajax: service(),
  store: service(),

  queryParams: ['query', 'page', 'resultsPerPage'],
  query: null,
  page: 1,
  resultsPerPage: 9,

  totalPages: computed('model.meta.total', 'resultsPerPage', function () {
    return Math.ceil(get(this, 'model.meta.total') / get(this, 'resultsPerPage'));
  }),

  activeFilters: computed('query', function () {
    if (get(this, 'query')) {
      const queryTree = QP.parseString(get(this, 'query'));
      return QP.getFilters(queryTree).map(filter => `${filter.predicate}:${filter.text}`);
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

    addFilter(predicate, text) {
      this._toggleFilter('addFilter', predicate, text);
    },

    removeFilter(predicate, text) {
      this._toggleFilter('removeFilter', predicate, text);
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
    let currentQueryTree = '';
    if (get(this, 'query')) {
      currentQueryTree = QP.parseString(get(this, 'query'));
    }
    const newQueryTree = QP[action](currentQueryTree, predicate, text);
    set(this, 'query', QP.toBoolString(newQueryTree));
  }
});
