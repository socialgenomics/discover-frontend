import Ember from 'ember';
const { Component, computed, get } = Ember;

export default Component.extend({
  isCollections: computed(function () {
    return get(this, 'active') === 'collections';
  }),
  isDatasources: computed(function () {
    return get(this, 'active') === 'datasources';
  })
});
