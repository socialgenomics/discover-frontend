import Ember from 'ember';
import _ from 'npm:underscore';


var keyMappings = {
  'assayType': 'dataset.properties.assayType'
}

function compactObject(obj){
  _.each(obj, function(val, key){
    if (!val) { delete obj[key]; }
  });
  return obj;
}

function dtoQueryObject(params){
  params = compactObject(params)

  var query = {
    query: params.q
  }
  delete params.q;

  Object.keys(keyMappings).forEach(function(key){
    console.log(key)
    if (key in params){
      params[keyMappings[key]] = params[key];
      delete params[key];
    }
  })

  if (!Ember.$.isEmptyObject(params)){
    query.filter = params;
  }

  return { dto: JSON.stringify(query)};
}

export default Ember.Route.extend({
  queryParams: {
    q: {
      refreshModel: true
    },
    assayType: {
      refreshModel: true
    }
  },
  meta:{},
  model: function(params){

    var _this = this;
    var query = dtoQueryObject(params)

    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax(
        {
          url:'/api/datasets/search',
          type:'POST',
          data:query
        })
        .then(function(resp){
        _this.meta = resp.meta;
        delete resp.meta;
        if (_this.meta.total > 0){
          _this.store.pushPayload('Dataset', resp);
          var ids = _.map(resp.datasets, function(dataset){ return dataset.id; });
          // Using `store.find('dataset', {ids: ids})` hits the backend.
          // use this instead..
          var datasets = _.map(ids, function(id){
            return _this.store.find('Dataset', id);
          });
          resolve(datasets)
        }
        else {
          resolve([])
        }
      },function(err){
        return console.log(err);
      });
    });
  },
  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('meta', this.meta)
  }
});
