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

  queryParamsDidChange: function() {
    this.set('isLoading', true);
    this.set('datasets', []);
    if (!Ember.isNone(this.get('filters'))) {
      let qps = this.get('queryParams');
      this.set('query', qps.q);
      delete qps.q;
      this.set('ordering', qps.ordering);
      delete qps.ordering;
      this.set('offset', qps.offset);
      delete qps.offset;

      for (let key in qps) {
        let filter = this.filters.findBy('name', key);
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
      for (let key in resp.aggs) {
        var DSL = {};
        DSL[key] = resp.aggs[key];
        let agg = Agg.create({
          aggDSL: DSL, //TODO:: this is dodgy
          show: true
        });
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
      return Promise.all(datasets.map(dataset => {
        dataset.set('colour', this.getAssayColourForDataset(dataset));
        return dataset;
      }));
    })
    .then(datasets => {
      this.set('datasets', []);
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


  DSL: Ember.computed('query', 'offset', 'filters.@each.value', function() {
    let query = {
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
        if (!Ember.isNone(value)) { return value; }
      });
      query.body.query.filtered.filter.bool.must = filtersBool;
    }
    return JSON.stringify(query);
  }),

  getAssayColourForDataset: function(dataset) {
    let assay;
    if (assay = dataset.get('assay')) {
      assay = assay;
    } else {
      assay = 'Not Available';
    }
    return colours.getColour(assay);
  }
});
