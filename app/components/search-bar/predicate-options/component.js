import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNameBindings: [
    'attrs.extra.hasPredicateOptions:border-bottom',
    'attrs.extra.hasPredicateOptions:p3'
  ]
});
