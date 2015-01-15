import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    search: function(query){
      console.log(query)
//      this.ajax({
//        
//      });
    }
  }
});
