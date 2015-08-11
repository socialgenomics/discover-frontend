import Ember from 'ember';
import keyMappings from './mappings';
import { titleCase } from 'repositive/utils/case';

export default Ember.Object.extend({
  name: null,
  value: null, 
  
  displayName: function(){
    return titleCase(this.get('name'));
  }.property('name'),

  DSL: function(){
    if (Ember.isNone(this.get('value'))){ return null }
    var d = { term: {} };
    d.term[keyMappings[this.get('name')]] = this.get('value');
    return d;
  }.property('name', 'value'),
});
