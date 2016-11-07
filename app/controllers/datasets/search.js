import Ember from 'ember';
import searchMixin from 'repositive/packages/search/controllerMixin';

const { Controller, observer, get, set, run } = Ember;

export default Controller.extend(searchMixin, Ember.Evented, {
  queryParams: ['q', 'ordering', 'assay', 'datasource', 'access'],
  q: null,
  ordering: null,
  assay: null,
  datasource: null,
  access: null,
  modelLoadingDidChange: observer('model.isLoading', function() {
    if (!get(this, 'model.isLoading')) {
      // The view subscribes to this function
      // so that it can call some jquery after the
      // model has finised rendering
      run.schedule('afterRender', this, ()=> {
        this.trigger('modelLoaded');
      });
    }
  }),

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
