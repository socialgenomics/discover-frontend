import DS from 'ember-data';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
import Agg from './aggregation';
import Filter from './filter';
import _ from 'npm:underscore';
import { titleCase } from 'repositive/utils/case';


export default DS.Model.extend({
  user: DS.belongsTo('user'),
  datasets: DS.hasMany('dataset'),
  queryParams: DS.attr('object'),
  query: DS.attr('string'),
  meta: DS.attr('object'),
  ordering: DS.attr('boolean'),
  offset: DS.attr('number'),
  aggs: null,
  filters: null,
  isLoading: true,

  initialise: function(){
    
    if(Ember.isEmpty(this.get('queryParams'))){
      throw "please initialise with query params object";
    }
    else {
      if (Ember.isNone(this.get('aggs'))) { this.aggs = []; }
      if (Ember.isNone(this.get('filters'))) { this.filters = []; }

      var params = this.get('queryParams');
      this.set('query', params.q);
      this.set('ordering', params.ordering)
      delete params.q;
      delete params.ordering;

      for (var key in params){
        var agg = Agg.create({
          name: key,
          value: params[key],
          show: false,
        });
        this.aggs.pushObject(agg);

        var filter = Filter.create({
          name: key,
          value: params[key],
        });
        this.filters.pushObject(filter)
      }

      this.updateModelFromAPI()
    }
  }.on('ready'),

  queryParamsDidChange: function(){
    if (!Ember.isNone(this.get('filters'))){
      var qps = this.get('queryParams');
      this.set('query', qps.q);
      delete qps.q;
      this.set('ordering', qps.ordering);
      delete qps.ordering;
      this.set('offset', qps.offset);
      delete qps.offset;

      for (var key in qps){
        var filter = this.filters.findBy('name', key);
        filter.set('value', this.get('queryParams.'+key))
      }
    }
  }.observes('queryParams'),

  queryDidChange: function(){
    this.set('isLoading', true)
    this.get('aggs').setEach('show', false)   
    this.get('datasets').clear()
  }.observes('query'),

  updateModelFromAPI: function(){
    
    return ajax({
      url: ENV.APIRoutes['datasets.search'],
      type:'POST',
      data: "query="+this.get('DSL')
    })
    .then(function(resp){
      this.set('meta', resp.meta);
      if (this.get('meta.total') < 0){ return Ember.RSVP.reject("No results") }
      delete resp.meta;

      this.set('isLoading', false);
      // load the aggs from the resp
      this.set('aggs', []);
      for(var key in resp.aggs){
        var DSL = {}; 
        DSL[key] = resp.aggs[key];
        var agg = Agg.create({
          aggDSL: DSL, //TODO:: this is dodgy
          show: true,
        });
        this.aggs.pushObject(agg);
      }
      delete resp.aggs

      // load the results
      this.store.pushPayload('Dataset', resp);
      this.get('datasets').clear();
      resp.datasets.forEach(function(ds){
        var ds = this.store.getById('Dataset', ds.id);
        ds.set('colour', this.getAssayColourForDataset(ds));
        this.get('datasets').pushObject(ds);
      }.bind(this));
    }.bind(this))
    .catch(function(err){
      return Ember.RSVP.reject(err)
    });

  }.observes('DSL'),

  DSL: function(){
    var query = {
      "index": "datasets",
      "type": "dataset",
      "from": this.get('offset'),
      "size": 30,
      "body": {
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

    this.get('aggs').forEach(function(agg){
      var a = agg.get('DSL');
      query.body.aggs[agg.name] = a[agg.name];
    });
    
    if (Ember.isEmpty(this.get('filters'))){
      query.body.query = {
        "query_string": {
          "query": this.get('query'),
          "default_operator": "AND"
        }
      };
    }
    else {
      query.body.query = {
        "filtered": {
          "query": {
            "query_string": {
              "query": this.get('query'),
              "default_operator": "AND",
            }
          },
          "filter": {
            "bool": {
              "must": null
            }
          }
        }
      };
      var filtersBool = this.get('filters').map(function(filter){
        return filter.get('DSL');
      })
      .filter(function(value){
        if (!Ember.isNone(value)) { return value; }
      });
      query.body.query.filtered.filter.bool.must = filtersBool;
    }
    console.log(query)
    return JSON.stringify(query); 
  }.property('query', 'offset', 'filters.@each.value'),

  getAssayColourForDataset: function(dataset){
    var buckets = this.get('aggs').findBy('name', 'assayType').get('buckets');
    var bucket = buckets.findBy('key', dataset.get('properties.assayType'));
    if (Ember.isEmpty(bucket)){
      bucket = buckets.findBy("key", "Other");
    }
    if (Ember.isEmpty(bucket)){
      bucket = buckets.findBy("key", "other");
    }
    if (!Ember.isEmpty(bucket)){
      return bucket.get('colour');
    }
    else{
      return ''
    }
  }

});
