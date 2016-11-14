import Ember from 'ember';
import searchMixin from 'repositive/packages/search/controllerMixin';

const { Controller, get, set } = Ember;

export default Controller.extend(searchMixin, {
  queryParams: ['q', 'ordering', 'assay', 'datasource', 'access'],
  q: null,
  ordering: null,
  assay: null,
  datasource: null,
  access: null,

  actions: {
    previousPage() {
      const resultsPerPage = get(this, 'model.resultsPerPage');
      set(this, 'model.isLoading', true);
      get(this, 'model.datasets').clear();
      get(this, 'model').updateOffset(resultsPerPage, 'decrement');
    },
    nextPage() {
      const resultsPerPage = get(this, 'model.resultsPerPage');
      set(this, 'model.isLoading', true);
      get(this, 'model.datasets').clear();
      get(this, 'model').updateOffset(resultsPerPage, 'increment');
    }
  }
});
