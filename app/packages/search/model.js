// import Ember from 'ember';
// import Model from 'ember-data/model';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';
// import ENV from 'repositive/config/environment';
// import Agg from './aggregation';
// import Filter from './filter';
// import request from 'ember-ajax/request';
//
// const { get, set, setProperties, isEmpty, isPresent, isNone, RSVP, Logger } = Ember;
//
// export default Model.extend({
//   user: belongsTo('user'),
//   datasets: hasMany('dataset'),
//   queryParams: attr('object'),
//   query: attr('string'),
//   meta: attr('object'),
//   ordering: attr('boolean'),
//   offset: attr('number', { defaultValue: 0 }),
//   aggs: null,
//   filters: null,
//   isLoading: true,
//   isError: false,
//   resultsPerPage: 9,
//
//   initialise: function() {
//     if (isEmpty(get(this, 'queryParams'))) {
//       throw 'please initialise with query params object';
//     } else {
//       if (isNone(get(this, 'aggs'))) {
//         set(this, 'aggs', []);
//       }
//       if (isNone(get(this, 'filters'))) {
//         set(this, 'filters', []);
//       }
//       const params = get(this, 'queryParams');
//       setProperties(this, { 'query': params.q, 'ordering': params.ordering });
//       delete params.q;
//       delete params.ordering;
//       for (const key in params) {
//         const agg = Agg.create({
//           name: key,
//           value: params[key],
//           show: false
//         });
//         this.aggs.pushObject(agg);
//         const filter = Filter.create({
//           name: key,
//           value: params[key]
//         });
//         this.filters.pushObject(filter);
//       }
//       this.updateModelFromAPI();
//     }
//   }.on('ready'),
//
//   // Calls updateModelFromAPI whenever a filter is added/removed
//   queryParamsDidChange: Ember.observer('queryParams', function() {
//     setProperties(this, {
//       'isLoading': true,
//       'isError': false,
//       'datasets': []
//     });
//     if (isPresent(get(this, 'filters'))) {
//       const qps = get(this, 'queryParams');
//       setProperties(this, {
//         'query': qps.q,
//         'ordering': qps.ordering,
//         'offset': qps.offset
//       });
//       delete qps.q;
//       delete qps.ordering;
//       delete qps.offset;
//       //Set the new filter in the filters array.
//       for (const key in qps) {
//         const filter = this.filters.findBy('name', key);
//         set(filter, 'value', get(this, 'queryParams.' + key));
//       }
//       this.updateModelFromAPI();
//     }
//   }),
//
//   queryDidChange: Ember.observer('query', function() {
//     set(this, 'isLoading', true);
//     get(this, 'aggs').setEach('show', false);
//     get(this, 'datasets').clear();
//     // Because the query is stored in queryParams as 'q'
//     // whenever query is changed, the queryParams are updated.
//   }),
//
//   /*
//     Makes request to datasets.search using the DSL.
//       Then handles response:
//         If no results -> reject
//         Loads the aggregations from the response
//         Push datasets to store
//   */
//   updateModelFromAPI: function() {
//     return request(ENV.APIRoutes['datasets.search'], {
//       method: 'POST',
//       data: 'query=' + this._buildDSL()
//     })
//       .then(resp => {
//         setProperties(this, { 'meta': resp.meta, 'aggs': [] });
//         if (get(this, 'meta.total') < 0) {
//           return RSVP.reject('No results');
//         }
//         delete resp.meta;
//         set(this, 'aggs', this._buildFilters(resp.aggs));
//         delete resp.aggs;
//         const promisedDatasets = resp.datasets.map(dataset => {
//           delete dataset.datasource;
//           return this.store.push(this.store.normalize('dataset', dataset));
//         });
//         return promisedDatasets;
//       })
//         .then(datasets => {
//           set(this, 'datasets', []);
//           datasets.forEach(dataset => {
//             get(this, 'datasets').pushObject(dataset);
//           });
//           set(this, 'isLoading', false);
//         })
//         .catch(err => {
//           setProperties(this, { 'isLoading': false, 'isError': true });
//           Logger.error(err);
//           return RSVP.reject(err);
//         });
//   },
//
//   updateOffset: function(value, type) {
//     if (type === 'increment') {
//       this.incrementProperty('offset', value);
//     } else if (type === 'decrement') {
//       this.decrementProperty('offset', value);
//     } else {
//       set(this, 'offset', value);
//     }
//     this.updateModelFromAPI();
//   },
//
//   _buildDSL() {
//     let query = {
//       'index': 'datasets',
//       'type': 'dataset',
//       'from': get(this, 'offset'),
//       'size': get(this, 'resultsPerPage'),
//       'body': {
//         'highlight': {
//           'fields': {
//             'description': {}
//           },
//           'require_field_match': false,
//           'pre_tags': ['<em class="highlight">'],
//           'post_tags': ['</em>']
//         },
//         'aggs': {}
//       }
//     };
//
//     get(this, 'aggs').forEach(function(agg) {
//       const a = get(agg, 'DSL');
//       query.body.aggs[agg.name] = a[agg.name];
//     });
//
//     let queryInstance;
//     if (get(this, 'query') !== '') {
//       queryInstance = {
//         'query_string': {
//           'query': get(this, 'query'),
//           'default_operator': 'AND'
//         }
//       };
//     } else {
//       queryInstance = null;
//     }
//
//     if (isEmpty(get(this, 'filters'))) {
//       query.body.query = queryInstance;
//     } else {
//       query.body.query = {
//         'filtered': {
//           'query': queryInstance,
//           'filter': {
//             'bool': {
//               'must': null
//             }
//           }
//         }
//       };
//       const filtersBool = get(this, 'filters')
//       .map(filter => get(filter, 'DSL'))
//       .filter(value => {
//         if (isPresent(value)) { return value; }
//       });
//       query.body.query.filtered.filter.bool.must = filtersBool;
//     }
//     return JSON.stringify(query);
//   },
//
//   //TODO: refactor to use reduce
//   _buildFilters(aggs) {
//     const aggsToReturn = [];
//     for (const key in aggs) {
//       const DSL = {};
//       DSL[key] = aggs[key];
//       const agg = Agg.create({
//         aggDSL: DSL, //TODO:: this is dodgy
//         show: true
//       });
//       if (agg.name === 'assay') {
//         set(agg, 'buckets', agg.buckets.reject(bucket => bucket.key === 'Not Available'));
//       }
//       aggsToReturn.pushObject(agg);
//     }
//     return aggsToReturn;
//   }
// });
