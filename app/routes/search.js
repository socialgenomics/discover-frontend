import Ember from 'ember';

export default Ember.Route.extend({
  query:'',
  actions: {
    search: function(){
      this.transitionTo('search.results', this.get('query'));
    }
  }
});
