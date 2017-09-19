import Ember from 'ember';

const { Component, get, set } = Ember;

export default Component.extend({
  classNames: ['p3 border-bottom'],

  init() {
    this._super(...arguments);
    const predicates = [
      'Assay',
      'Disease',
      'Technology',
      'Tissue'
    ]
    set(this, 'predicates', predicates);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._setPredicateOptions(get(this, 'attrs.select.searchText'), get(this, 'predicates'))
  },

  _setPredicateOptions(searchText = '', predicates) {
    const predicateOptions = predicates.filter(predicate => predicate.includes(searchText));
    set(this, 'predicateOptions', predicateOptions);
  }
});
