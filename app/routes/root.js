import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export default Ember.Route.extend({

  model: function(){
    if (this.get('session.isAuthenticated')){
      return Ember.RSVP.all([
        ajax({url: ENV.APIRoutes['datasets.search'] , type:'GET' }),
        this.store.findAll('dataset'),
        this.store.query('dataset', {isRequest: true}),
        this.store.query('dataset', {repository:"REPOSITIVE", isRequest: false})
      ])
      .then(function(data){
        return {
          stats: data[0],
          datasets: data[1].slice(0,3),
          requests: data[2],
          registered: data[3]
        }
      })
      .catch(function(err){
        Ember.Logger.error(err)
      });
    }
    else {
      return null;
    }
  },
  actions:{
  }
});
