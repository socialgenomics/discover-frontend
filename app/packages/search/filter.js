import Ember from 'ember';
import keyMappings from './mappings';
import { titleCase } from 'repositive/utils/case';

export default Ember.Object.extend({
  name: null,
  value: null,

  displayName: Ember.computed('name', function(){
    return titleCase(this.get('name'));
  }),

  DSL: Ember.computed('name', 'value', function(){
    if (Ember.isNone(this.get('value'))) {
      return null;
    }
    let d = { term: {} };
    d.term[keyMappings[this.get('name')]] = this.get('value');
    return d;
  })
});
