import Ember from 'ember';

const { Component, get, set, computed, inject: { service } } = Ember;

export default Component.extend({
  tagName: 'nav',
  classNames: ['side-nav filters-list'],
  classNameBindings: ['light-font-color'],
  session: service(),

  isEmptyFilters: computed('filters.@each.buckets', function () {
    const filters = get(this, 'filters');

    return filters && filters.length && filters.reduce((count, type) => count + type.buckets.length, 0) === 0;
  }),
  didReceiveAttrs() {
    this._super(...arguments);

    if (get(this, 'modelType') === 'datasource') {
      set(this, 'filters', get(this, 'filters').rejectBy('name', 'datasource'));
    }
  }
});
