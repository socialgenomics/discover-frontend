import Ember from 'ember';
const { computed, get } = Ember;

export default Ember.Component.extend({
  isCollections: computed(function () {
    return get(this, 'active') === 'collections';
  }),
  isDatasources: computed(function () {
    return get(this, 'active') === 'datasources';
  })
});
