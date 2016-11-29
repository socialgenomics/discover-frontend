import Ember from 'ember';
import keyMappings from './mappings';
import { titleCase } from 'repositive/utils/case';

const { computed, isNone, get } = Ember;

export default Ember.Object.extend({
  name: null,
  value: null,
  displayName: computed('name', function() {
    return titleCase(get(this, 'name'));
  }),
  DSL: computed('name', 'value', function() {
    if (isNone(get(this, 'value'))) {
      return null;
    }
    const d = { term: {} };
    d.term[keyMappings[get(this, 'name')]] = get(this, 'value');
    return d;
  })
});
