import Ember from 'ember';
import keyMappings from './mappings';

export default Ember.Object.extend({
  name: null,
  value: null, 
  DSL: function(){
    if (Ember.isNone(this.get('value'))){ return null }
    var d = { term: {} };
    d.term[keyMappings[this.get('name')]] = this.get('value');
    return d;
  }.property('name', 'value'),
});
