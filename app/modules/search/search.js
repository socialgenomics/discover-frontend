import DS from 'ember-data';
import ajax from 'ic-ajax';
import ENV from 'repositive.io/config/environment';


export default DS.Model.extend({
  user: DS.belongsTo('user'),
  datasets: DS.hasMany('dataset'),
  filters: DS.haMany('filter'),
  query: DS.attr('string'),
  meta: {},

  createFromQueryParams(param){
    var _this = this;
    if (!Ember.$.isPlainObject(param)) { throw "Please use a object" } 
    var search = this.create({
      query: params.q
    })
    delete params.q
    _.pairs(param).forEach(function(key, value){
      var filter = Filter.create({
        field: key,
        term: value, 
      })
      search.filters.pushObject(filter)
    });
    return search
  }

  run(query){
    var _this = this;
    this.set('query', this.get('query') || query);
    
    return ajax({
      url: ENV.APIRoutes['datasets.search'],
      type:'POST',
      data:query
    })
    .then(function(resp){
      if (_this.meta.total < 0){ return Ember.RSVP.reject("No results") }

      // load the results
      _this.store.pushPayload('Dataset', resp);
      var ids = _.map(resp.datasets, function(dataset){ return dataset.id; });
      // Using `store.find('dataset', {ids: ids})` hits the backend.
      // use this instead..
      _this.datasets = _.map(ids, function(id){
        return _this.store.find('Dataset', id);
      });

      // load the aggregations from the resp
      for(var key in resp.aggregations){f
        _this.aggregations.pushObject(Aggregation.create({key: resp.aggregations[key]}))
      } 

      return _this;
    })
    .catch(function(err){
      console.assert(false, err)
      return Ember.RSVP.reject(err)
    });
  }
});
