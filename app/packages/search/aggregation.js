import Ember from 'ember';
import Bucket from './bucket';
import colours from 'repositive/utils/colours';
import { titleCase } from 'repositive/utils/case';
import keyMappings from './mappings';

const { computed, get, set, $ } = Ember;

export default Ember.Object.extend({
  name: null,
  value: null,
  DSL: null,
  buckets: null,
  show: false,

  displayName: computed('name', function() {
    return titleCase(get(this, 'name'));
  }),

  init: function() {
    if (!$.isEmptyObject(get(this, 'aggDSL'))) {
      const DSL = get(this, 'aggDSL'); // TODO: rmove this dependancy on aggDSL as it is confusing
      const name = Object.keys(DSL)[0];
      set(this, 'name', name);
      const buckets = DSL[name].buckets;
      set(this, 'buckets', []);
      buckets.forEach(bucket => {
        bucket.colour = colours.getColour(bucket.key);
        const b = Bucket.create(bucket);
        this.buckets.pushObject(b);
      });
    }
  },

  initDSL: function() {
    const fieldName = keyMappings[this.name];
    const q = {};
    q[get(this, 'name')] = {
      terms: {
        field: fieldName
      }
    };
    set(this, 'DSL', q);
  }.observes('name', 'value').on('init')

});
