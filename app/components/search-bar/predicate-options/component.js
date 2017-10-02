import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNameBindings: [
    'attrs.extra.hasPredicateOptions:border-bottom',
    'attrs.extra.hasPredicateOptions:p3'
  ],
  isLoading: computed('extra.isFetching', function() {
    return get(this, 'extra.isFetching');
  })
});
