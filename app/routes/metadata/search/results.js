import Ember from 'ember';
import request from 'ic-ajax';
import _ from 'npm:underscore';

export default Ember.Route.extend({
  model: function(params){
    var route = this;
    return request(
      {
        url:'api/search',
        type:'POST',
        data:params
      }).then(function(resp){
      // TODO: hack to remove nulll values
      var cleanIds = _.compact(resp.ids)
      return route.store.findByIds('Meta', cleanIds)
    },function(err){
      return console.log(err)
    })
  }
});
