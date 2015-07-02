import Ember from 'ember';
import Bucket from './bucket';

var keyMappings = {
  'assayType': 'dataset.properties.assayType',
  'accessType': 'dataset.repository.access',
  'repository': 'dataset.repository.name',
  'tags': 'dataset.tags'
}

var Agg = Ember.Object.extend({
  name: "",
  value: "",
  buckets: [], 

  setBuckets: function(buckets){
    if (typeof object.buckets === 'array'){
      var colours = getColours(object.buckets.length);
      var i = 0;
      object.buckets.forEach(function(bucket){
        bucket.colour = colours[i];
        this.buckets.push(Bucket.create(bucket));
        i++;
      });
    }
  },

  serialise(){
    // TODO: create query for selected buckets
    var fieldName = keyMappings[this.name];
    var q = {};
    q[this.get('name')] = { 
      terms: {
        field: fieldName 
      }
    };
    return q
  },

});

Agg.reopenClass({

  create: function(object, fromES){
    if (fromES){
      var instance = this._super({});
      var name = Object.keys(object)[0];
      instance.set('name', name);
      object[name].buckets.forEach(function(bucket){
        instance.buckets.push(Bucket.create(bucket));
      });
      return instance;
    }
    else {
      return this._super(object);
    }
  },

});

export default Agg;

