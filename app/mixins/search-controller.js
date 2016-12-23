import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  queryParams: ['query', 'page', 'resultsPerPage'],
  query: null,
  page: 1
});
