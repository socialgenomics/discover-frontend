import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
 // model: function(){
 //   this.store.find('dataset');
 // }
  actions:{

    search: function(query){
      this.transitionToRoute('search.results', query);
    }
  }
});
