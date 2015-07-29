import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive.io/config/environment';

export default Ember.Route.extend({

  model: function(){
    if (this.get('session.isAuthenticated')){
      console.log('in root model')
      return {};
//      return Ember.RSVP.all([
//        ajax({url: ENV.APIRoutes['datasets.search'] , type:'GET' }),
//        this.store.find('dataset'),
//        this.store.find('dataset', {isRequest: 1}),
//        this.store.find('dataset', {repository:"REPOSITIVE", isRequest:0})
//      ])
//      .then(function(data){
//        return {
//          stats: data[0],
//          datasets: data[1].slice(0,3),
//          requests: data[2],
//          registered: data[3]
//        }
//      })
    }
    else {
      return null;
    }
  },
  actions:{
  }
});
