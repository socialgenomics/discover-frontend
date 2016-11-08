import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
import Agg from './aggregation';
import Filter from './filter';

export default Model.extend({
  user: belongsTo('user'),
  datasets: hasMany('dataset'),
  queryParams: attr('object'),
  query: attr('string'),
  meta: attr('object'),
  ordering: attr('boolean'),
  offset: attr('number', { defaultValue: 0 }),
  aggs: null,
  filters: null,
  isLoading: true,
  isError: false,
  resultsPerPage: 9,

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

      let params = this.get('queryParams');
      this.set('query', params.q);
      this.set('ordering', params.ordering);
      delete params.q;
      delete params.ordering;
      for (let key in params) {
        let agg = Agg.create({
          name: key,
          value: params[key],
          show: false
        });
        this.aggs.pushObject(agg);

        let filter = Filter.create({
          name: key,
          value: params[key]
        });
        this.filters.pushObject(filter);
      }

      this.updateModelFromAPI();
    }
  }.on('ready'),

  queryParamsDidChange: Ember.observer('queryParams', function() {
    this.set('isLoading', true);
    this.set('isError', false);
    this.set('datasets', []);
    if (Ember.isPresent(this.get('filters'))) {
      let qps = this.get('queryParams');
      this.set('query', qps.q);
      delete qps.q;
      this.set('ordering', qps.ordering);
      delete qps.ordering;
      this.set('offset', qps.offset);
      delete qps.offset;

      //Set the new filter in the filters array.
      for (let key in qps) {
        let filter = this.filters.findBy('name', key);
        filter.set('value', this.get('queryParams.' + key));
      }
      this.updateModelFromAPI();
    }
  }),

  queryDidChange: Ember.observer('query', function() {
    this.set('isLoading', true);
    this.get('aggs').setEach('show', false);
    this.get('datasets').clear();
    // Because the query is stored in queryParams as 'q'
    // whenever query is changed, the queryParams are updated.
  }),

  updateModelFromAPI: function() {
    return ajax({
      url: ENV.APIRoutes['datasets.search'],
      type: 'POST',
      data: 'query=' + this.get('DSL')
    })
    .then(resp => {
      this.set('meta', resp.meta);
      if (this.get('meta.total') < 0) {
        return Ember.RSVP.reject('No results');
      }
      delete resp.meta;

      // load the aggs from the resp
      this.set('aggs', []);
      for (let key in resp.aggs) {
        var DSL = {};
        DSL[key] = resp.aggs[key];
        let agg = Agg.create({
          aggDSL: DSL, //TODO:: this is dodgy
          show: true
        });
        if (agg.name === 'assay') {
          const filteredAssays = agg.buckets.reject((bucket) => {
            return bucket.key === 'Not Available';
          });
          agg.set('buckets', filteredAssays);
        }
        this.aggs.pushObject(agg);
      }
      delete resp.aggs;
      let promisedDatasets = resp.datasets.map(dataset => {
        delete dataset.datasource;
        return this.store.push(this.store.normalize('dataset', dataset));
      });
      return promisedDatasets;
    })
    .then(datasets => {
      this.set('datasets', []);
      datasets.forEach(dataset => {
        this.get('datasets').pushObject(dataset);
      });
      this.set('isLoading', false);
    })
    .catch((err) => {
      this.set('isLoading', false);
      this.set('isError', true);
      Ember.Logger.error(err);
      return Ember.RSVP.reject(err);
    });
  },


  DSL: Ember.computed('query', 'offset', 'filters.@each.value', function() {
    let query = {
      'index': 'datasets',
      'type': 'dataset',
      'from': this.get('offset'),
      'size': this.get('resultsPerPage'),
      'body': {
        'highlight': {
          'fields': {
            'description': {}
          },
          'require_field_match': false,
          'pre_tags': ['<em class="highlight">'],
          'post_tags': ['</em>']
        },
        'aggs': {}
      }
    };

    this.get('aggs').forEach(function(agg) {
      let a = agg.get('DSL');
      query.body.aggs[agg.name] = a[agg.name];
    });

    let queryInstance;
    if (this.get('query') !== '') {
      queryInstance = {
        'query_string': {
          'query': this.get('query'),
          'default_operator': 'AND'
        }
      };
    } else {
      queryInstance = null;
    }

    if (Ember.isEmpty(this.get('filters'))) {
      query.body.query = queryInstance;
    } else {
      query.body.query = {
        'filtered': {
          'query': queryInstance,
          'filter': {
            'bool': {
              'must': null
            }
          }
        }
      };
      let filtersBool = this.get('filters')
      .map(filter => filter.get('DSL'))
      .filter(value => {
        if (Ember.isPresent(value)) { return value; }
      });
      query.body.query.filtered.filter.bool.must = filtersBool;
    }
    return JSON.stringify(query);
  }),

  updateOffset: function(value, type) {
    if (type === 'increment') {
      this.incrementProperty('offset', value);
    } else if (type === 'decrement') {
      this.decrementProperty('offset', value);
    } else {
      this.set('offset', value);
    }
    this.updateModelFromAPI();
  }
});
