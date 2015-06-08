import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive.io/config/environment';

export default Ember.Route.extend({

  model: function(){
    if (this.get('session.isAuthenticated')){
      return Ember.RSVP.all([
        ajax({url: ENV.APIRoutes['datasets.search'] , type:'GET' }),
        this.store.find('dataset'),
      ])
      .then(function(data){
        return {
          stats: data[0],
          datasets: data[1].slice(0,3)
        }
      })
    }
    else {
      return null;
    }
  },

  actions:{
  }
});
