import Ember from 'ember';
import _ from 'npm:underscore';
import ajax from 'ic-ajax';
import ENV from 'repositive.io/config/environment';
import Search from 'repositive.io/models/search';


//var keyMappings = {
//  'assayType': 'dataset.properties.assayType'
//}
//
//function compactObject(obj){
//  _.each(obj, function(val, key){
//    if (!val) { delete obj[key]; }
//  });
//  return obj;
//}
//
//function dtoQueryObject(params){
//  params = compactObject(params)
//
//  var query = {
//    query: params.q
//  }
//  delete params.q;
//
//  Object.keys(keyMappings).forEach(function(key){
//    console.log(key)
//    if (key in params){
//      params[keyMappings[key]] = params[key];
//      delete params[key];
//    }
//  })
//
//  if (!Ember.$.isEmptyObject(params)){
//    query.filter = params;
//  }
//
//  return { dto: JSON.stringify(query)};
//}

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
    return this.store.createRecord('Search', {
      queryParams: params,
      user: this.get('currentUser'),
    }).run();
  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('meta', this.meta)
  }
});
