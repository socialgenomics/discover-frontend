import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';

const { Component, get, set, computed } = Ember;

const Validations = buildValidations({
  attributeValue: presenceValidator('You must enter a value.')
});

export default Component.extend(Validations, {
  isNotUnique: computed('attributesForKey', 'attributeValue', function() {
    const attrInput = (get(this, 'attributeValue') || '').toLowerCase();
    return get(this, 'attributesForKey')
      .any(attr => attr.value.toLowerCase() === attrInput);
  }),

  actions: {
    addAttribute() {
      if (get(this, 'validations.isValid') && !get(this, 'isNotUnique')) {
        get(this, 'addAttribute')(get(this, 'group'), get(this, 'attributeValue'));
        get(this, 'closeInput')();
      }
    },
    cancel() { get(this, 'closeInput')(); }
  }
});
