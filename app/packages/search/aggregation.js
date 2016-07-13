import Ember from 'ember';
import Bucket from './bucket';
import colours from 'repositive/utils/colours';
import { titleCase } from 'repositive/utils/case';
import keyMappings from './mappings';


export default Ember.Object.extend({
  name: null,
  value: null,
  DSL: null,
  buckets: null,
  show: false,

  displayName: function() {
    return titleCase(this.get('name'));
  }.property('name'),

  init: function() {
    if (!Ember.$.isEmptyObject(this.get('aggDSL'))) {
      var DSL = this.get('aggDSL'); // TODO: rmove this dependancy on aggDSL as it is confusing
      var name = Object.keys(DSL)[0];
      this.set('name', name);
      var buckets = DSL[name].buckets;
      this.set('buckets', []);
      buckets.forEach(function(bucket) {
        bucket.colour = colours.getColour(bucket.key);
        var b = Bucket.create(bucket);
        this.buckets.pushObject(b);
      }.bind(this));
    }
  },

  initDSL: function() {
    var fieldName = keyMappings[this.name];
    var q = {};
    q[this.get('name')] = {
      terms: {
        field: fieldName
      }
    };
    this.set('DSL', q);
  }.observes('name', 'value').on('init')

});
