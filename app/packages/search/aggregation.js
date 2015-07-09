import Ember from 'ember';
import Bucket from './bucket';
import { getColours } from 'repositive.io/utils/colours';
import keyMappings from './mappings';


export default Ember.Object.extend({
  name: null,
  value: null,
  DSL: null,
  buckets: null, 
  show: false,

  init: function(){
    if (!Ember.$.isEmptyObject(this.get('aggDSL'))){
      var DSL = this.get('aggDSL')
      var name = Object.keys(DSL)[0];
      this.set('name', name);
      var buckets = DSL[name].buckets;
      var colours = getColours(buckets.length);
      var i = 0;
      this.set('buckets', []);
      buckets.forEach(function(bucket){
        bucket.colour = colours[i];
        var b = Bucket.create(bucket);
        this.buckets.pushObject(b);
        i++;
      }.bind(this));
    }
  },

  DSL: function(){
    var fieldName = keyMappings[this.name];
    var q = {};
    q[this.get('name')] = { 
      terms: {
        field: fieldName 
      }
    };
    this.set('DSL', q);
  }.observes('name', 'value').on('init'),

});
