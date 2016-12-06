import Ember from 'ember';
import searchControllerMixin from '../../mixins/search-controller';

const { Controller, get, set } = Ember;

export default Controller.extend(searchControllerMixin, {
  // actions: {
  //   previousPage() {
  //     const resultsPerPage = get(this, 'model.resultsPerPage');
  //     set(this, 'model.isLoading', true);
  //     get(this, 'model.datasets').clear();
  //     get(this, 'model').updateOffset(resultsPerPage, 'decrement');
  //   },
  //   nextPage() {
  //     const resultsPerPage = get(this, 'model.resultsPerPage');
  //     set(this, 'model.isLoading', true);
  //     get(this, 'model.datasets').clear();
  //     get(this, 'model').updateOffset(resultsPerPage, 'increment');
  //   }
  // }
});
