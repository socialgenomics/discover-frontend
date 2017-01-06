import Ember from 'ember';
// import QP from 'npm:../../query-parser';
import searchControllerMixin from '../../mixins/search-controller';

const { Controller } = Ember;

export default Controller.extend(searchControllerMixin, {
  // queryParams: ['query', 'page', 'resultsPerPage'],
  // query: null,
  // page: 1,
  // resultsPerPage: 9,

  // totalPages: computed('model.meta.total', 'resultsPerPage', function () {
  //   return Math.ceil(get(this, 'model.meta.total') / get(this, 'resultsPerPage'));
  // }),
  //
  // activeFilters: computed('query', function () {
  //   const queryTree = QP.parseString(get(this, 'query'));
  //
  //   return QP.getFilters(queryTree).map(filter => `${filter.predicate}:${filter.text}`);
  // }),

  // actions: {
  //   nextPage() {
  //     this.incrementProperty('page');
  //   },
  //
  //   previousPage() {
  //     this.decrementProperty('page');
  //   },
  //
  //   addFilter(predicate, text) {
  //     this._toggleFilter('addFilter', predicate, text);
  //   },
  //
  //   removeFilter(predicate, text) {
  //     this._toggleFilter('removeFilter', predicate, text);
  //   }
  // },
  //
  // /**
  //  *
  //  * @param {String} action - QP method name ("addFilter" or "removeFilter")
  //  * @param {String} predicate
  //  * @param {String} text
  //  * @private
  //  */
  // _toggleFilter(action, predicate, text) {
  //   const currentQueryTree = QP.parseString(get(this, 'query'));
  //   const newQueryTree = QP[action](currentQueryTree, predicate, text);
  //
  //   set(this, 'query', QP.toBoolString(newQueryTree));
  // }
});
