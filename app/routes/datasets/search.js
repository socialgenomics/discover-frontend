import Ember from 'ember';
import _ from 'npm:underscore';
import ajax from 'ic-ajax';
import ENV from 'repositive.io/config/environment';
import SearchModel from 'repositive.io/models/search';


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
    },
    accessType:{
      refreshModel: true
    },
    repository: {
      refreshModel: true
    }
  },
  meta:{},

  model: function(params){
    var _this = this;
    var query = dtoQueryObject(params)
    
    var search = SearchModel.createFromQueryParams(params);

    var search.user = this.get('currentUser');

    search.run().then(function(results){
      // TODO: search result
    })

    return ajax({
        url: ENV.APIRoutes['datasets.search'],
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
        return datasets
      }
      else {
        return Ember.RSVP.reject("No results")
      }
    }).catch(function(err){
      console.assert(false, err)
      return Ember.RSVP.reject(err)
    });
  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('meta', this.meta)
  }
});
