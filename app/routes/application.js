import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  actions:{

    search: function(query){
      this.transitionTo('datasets.search', {queryParams: {q: query}});
    },
    showModal:function(message){
      this.flashMessage({
        content: message, // String
        duration:6000, // Number in milliseconds
        type: 'Fail', // String
      });
    }
  }
});
