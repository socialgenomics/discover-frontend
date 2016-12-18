import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  queryParams: {
    query: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    resultsPerPage: {
      refreshModel: true
    }
  }
});
