import Ember from 'ember';
import QP from 'npm:../../query-parser';
import colours from 'repositive/utils/colours';

const { Mixin, inject: { service }, get, set } = Ember;

export default Mixin.create({
  ajax: service(),
  store: service(),
  queryParams: {
    query: { refreshModel: true },
    page: { refreshModel: true },
    resultsPerPage: { refreshModel: true }
  },

  addFilter(predicate, text) {
    const queryTree = QP.parseString(get(this, 'query'));
    const withFilter = QP.addFilter(queryTree, predicate, text);
    set(this, 'query', QP.toBoolString(withFilter));
  },

  removeFilter(predicate, text) {
    const queryTree = QP.parseString(get(this, 'query'));
    const withoutFilter = QP.removeFilter(queryTree, predicate, text);
    set(this, 'query', QP.toBoolString(withoutFilter));
  }
});
