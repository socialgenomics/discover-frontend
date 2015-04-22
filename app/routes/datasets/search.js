import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    search: function(query){
      this.transitionTo('datasets.search.results', query);
    }
  }
});
