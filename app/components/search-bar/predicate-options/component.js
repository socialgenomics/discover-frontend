import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['c-predicate-options'],
  classNameBindings: [
    'attrs.extra.hasPredicateOptions:border-bottom',
    'attrs.extra.hasPredicateOptions:p3'
  ]
});
