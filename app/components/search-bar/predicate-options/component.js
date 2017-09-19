import Ember from 'ember';

const { Component, computed, get, set } = Ember;

export default Component.extend({
  classNames: ['p3'],
  classNameBindings: ['hasPredicateOptions:border-bottom'],

  hasPredicateOptions: computed.bool('predicateOptions'),

  init() {
    this._super(...arguments);
    const predicates = [
      { name: 'Assay', example: '(e.g. gwas)' },
      { name: 'Disease', example: '(e.g. Myeloma)' },
      { name: 'Technology', example: '(e.g. Affymetrix)' },
      { name: 'Tissue', example: '(e.g. Blood)' }
    ]
    set(this, 'predicates', predicates);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._setPredicateOptions(get(this, 'attrs.select.searchText'), get(this, 'predicates'))
  },

  _setPredicateOptions(searchText = '', predicates) {
    const predicateOptions = predicates.filter(predicate => predicate.name.includes(searchText));
    set(this, 'predicateOptions', predicateOptions);
  }
});
