import DS from 'ember-data';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
import Agg from './aggregation';
import Filter from './filter';
import Ember from 'ember';
import _ from 'npm:lodash';
import colours from '../../utils/colours';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  datasets: DS.hasMany('dataset'),
  queryParams: DS.attr('object'),
  query: DS.attr('string'),
  meta: DS.attr('object'),
  ordering: DS.attr('boolean'),
  offset: DS.attr('number', { defaultValue: 0 }),
  aggs: null,
  filters: null,
  isLoading: true,

  initialise: function() {
    if (Ember.isEmpty(this.get('queryParams'))) {
      throw 'please initialise with query params object';
    } else {
      if (Ember.isNone(this.get('aggs'))) {
        this.aggs = [];
      }

      if (Ember.isNone(this.get('filters'))) {
        this.filters = [];
      }

      var params = this.get('queryParams');
      this.set('query', params.q);
      this.set('ordering', params.ordering);
      delete params.q;
      delete params.ordering;
      for (var key in params) {
        var agg = Agg.create({
          name: key,
          value: params[key],
          show: false
        });
        this.aggs.pushObject(agg);

        var filter = Filter.create({
          name: key,
          value: params[key]
        });
        this.filters.pushObject(filter);
      }

      this.updateModelFromAPI();
    }
  }.on('ready'),

  queryParamsDidChange: function() {
    this.set('isLoading', true);
    this.set('datasets', []);
    if (!Ember.isNone(this.get('filters'))) {
      var qps = this.get('queryParams');
      this.set('query', qps.q);
      delete qps.q;
      this.set('ordering', qps.ordering);
      delete qps.ordering;
      this.set('offset', qps.offset);
      delete qps.offset;

      for (var key in qps) {
        var filter = this.filters.findBy('name', key);
        filter.set('value', this.get('queryParams.' + key));
      }
    }
  }.observes('queryParams'),

  queryDidChange: function() {
    this.set('isLoading', true);
    this.get('aggs').setEach('show', false);
    this.get('datasets').clear();
  }.observes('query'),

  updateModelFromAPI: function() {
    return ajax({
      url: ENV.APIRoutes['datasets.search'],
      type: 'POST',
      data: 'query=' + this.get('DSL')
    })
    .then((resp) => {
      this.set('meta', resp.meta);
      if (this.get('meta.total') < 0) {
        return Ember.RSVP.reject('No results');
      }

      delete resp.meta;

      // load the aggs from the resp
      this.set('aggs', []);
      for (var key in resp.aggs) {
        var DSL = {};
        DSL[key] = resp.aggs[key];
        var agg = Agg.create({
          aggDSL: DSL, //TODO:: this is dodgy
          show: true
        });
        this.aggs.pushObject(agg);
      }
      delete resp.aggs;

      //TODO Use the elasticsearch response instead of request a new one
      // Create a new entry in the store
      if (resp.datasets.length > 0 && !resp.datasets[0].id) {
        resp.datasets.shift();
      }
      let promisedDatasets = resp.datasets.map(dataset => {
        delete dataset.datasource;
        return this.store.push(this.store.normalize('dataset', dataset));
      });
      return promisedDatasets;
    })
    .then(datasets => {
      return Promise.all(datasets.map(dataset => {
        dataset.set('colour', this.getAssayColourForDataset(dataset));
        return dataset;
      }));
    })
    .then(datasets => {
      datasets.forEach(dataset => {
        this.get('datasets').pushObject(dataset);
      });
      this.set('isLoading', false);
    })
    .catch((err) => {
      Ember.Logger.error(err);
      return Ember.RSVP.reject(err);
    });
  }.observes('DSL'),

  DSL: function() {
    var query = {
      'index': 'datasets',
      'type': 'dataset',
      'from': this.get('offset'),
      'size': 30,
      'body': {
        'highlight': {
          'fields': {
            'title': {},
            'description': {}
          },
          'pre_tags': ['<em class="highlight">'],
          'post_tags': ['</em>']
        },
        'aggs': {}
      }
    };

    this.get('aggs').forEach(function(agg) {
      var a = agg.get('DSL');
      query.body.aggs[agg.name] = a[agg.name];
    });

    if (Ember.isEmpty(this.get('filters'))) {
      if (this.get('query') !== '' ) {
        query.body.query = {
          'query_string': {
            'query': this.get('query'),
            'default_operator': 'AND'
          }
        };
      }
    } else {
      query.body.query = {
        'filtered': {
          'query': {
            'query_string': {
              'query': this.get('query'),
              'default_operator': 'AND'
            }
          },
          'filter': {
            'bool': {
              'must': null
            }
          }
        }
      };
      var filtersBool = this.get('filters').map(function(filter) {
        return filter.get('DSL');
      })
      .filter(function(value) {
        if (!Ember.isNone(value)) { return value; }
      });
      query.body.query.filtered.filter.bool.must = filtersBool;
    }
    return JSON.stringify(query);
  }.property('query', 'offset', 'filters.@each.value'),

  getAssayColourForDataset: function(dataset) {
    let aggs = this.get('aggs');
    let assay;
    if (assay = dataset.get('assay')) {
      assay = assay.toLowerCase();
    } else {
      assay = 'other';
    }
    return colours.getColour(assay.split('-')[0]);
  },

  datasetsAllInARow: function() {
    let perRow = 3;
    let datasets = this.get('datasets');
    let out = [];
    for (var i = 0; i < datasets.length; i += perRow) {
      out.push(datasets.slice(i, i + perRow));
    }
    return out;
  }.property('datasets')
});
