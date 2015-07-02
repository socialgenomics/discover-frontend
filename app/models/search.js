import DS from 'ember-data';
import ajax from 'ic-ajax';
import ENV from 'repositive.io/config/environment';
import Agg from 'repositive.io/modules/search/aggregation';
import _ from 'npm:underscore';

//var ENABLED_AGGS = [
//  {name: "assayType"},
//  {name: "accessType"},
//]

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  datasets: DS.hasMany('dataset'),
  queryParams: DS.attr('object'),
  query: DS.attr('string'),
  meta: DS.attr('object'),
  ordering: DS.attr('boolean'),
  //aggregations: [],

  run: function(query){
    var _this = this;
    if (query){ this.set('query', query); }
    
    return ajax({
      url: ENV.APIRoutes['datasets.search'],
      type:'POST',
      data: "query="+this.serialiseQuery()
    })
    .then(function(resp){
      _this.set('meta', resp.meta);
      if (_this.get('meta.total') < 0){ return Ember.RSVP.reject("No results") }

      // load the results
      _this.store.pushPayload('Dataset', resp);
      var ids = _.map(resp.datasets, function(dataset){ return dataset.id; });
      // Using `store.find('dataset', {ids: ids})` hits the backend.
      // use this instead..
      _this.datasets = _.map(ids, function(id){
        return _this.store.find('Dataset', id);
      });

      // load the aggregations from the resp
      _this.aggregations = [];
      for(var key in resp.aggs){
        var j = {}; 
        j[key] = resp.aggs[key];
        var agg = Agg.create(j, true);
        _this.aggregations.pushObject(agg);
      }

      return _this;
    })
    .catch(function(err){
      console.assert(false, err)
      return Ember.RSVP.reject(err)
    });
  },

  queryParamsDidChange: function(){
    var _this = this;
    if (!this.hasOwnProperty('aggregations')) { this.aggregations = []; }

    var params = this.get('queryParams');
    this.set('query', params.q);
    this.set('ordering', params.ordering)
    delete params.q;
    delete params.ordering;

    for (var key in params){
      var agg = Agg.create({
        name: key,
        value: params[key],
      });
      this.aggregations.pushObject(agg);
    }
  }.observes('queryParams'),

  serialiseQuery: function(){
    var query = {
      "body": {
        "query": {
          "query_string": {
            "query": this.get('query'),
            "default_operator": "AND"
          }
        },
        "highlight": {
          "fields": {
            "title": {},
            "description": {},
          },
          "pre_tags": ['<em class="highlight">'],
          "post_tags": ['</em>'],
        },
        "aggs": {}
      }
    };
    this.aggregations.forEach(function(agg){
      var a = agg.serialise();
      return query.body.aggs[agg.name] = a[agg.name];
    });
    return JSON.stringify(query); 
  }
});
