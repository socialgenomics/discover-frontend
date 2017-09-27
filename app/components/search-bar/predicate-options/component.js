import Ember from 'ember';

const { Component, computed, get, set } = Ember;

export default Component.extend({
  classNameBindings: ['hasPredicateOptions:border-bottom', 'hasPredicateOptions:p3'],

  hasPredicateOptions: computed.notEmpty('predicateOptions'),
  predicateOptions: computed('attrs.extra.queryString', 'predicates', function() {
    const queryString = get(this, 'attrs.extra.queryString') || '';
    return get(this, 'predicates')
      .filter(predicate => predicate.name.toLowerCase().includes(queryString.toLowerCase()));
  }),

  init() {
    this._super(...arguments);
    const predicates = [
      { name: 'Assay', example: '(e.g. gwas)' },
      { name: 'Disease', example: '(e.g. Myeloma)' },
      { name: 'Technology', example: '(e.g. Affymetrix)' },
      { name: 'Tissue', example: '(e.g. Blood)' }
    ];
    set(this, 'predicates', predicates);
  }
});
