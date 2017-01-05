import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  active: computed('activeFilters', 'aggName', 'bucket.key', function () {
    const filter = `${get(this, 'aggName')}:${get(this, 'bucket.key')}`;

    return get(this, 'activeFilters').indexOf(filter) !== -1;
  })
});
