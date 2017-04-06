import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import { isUniqueString } from '../utils/arrays';

const { Component, get, computed } = Ember;

const Validations = buildValidations({
  attributeValue: presenceValidator()
});

export default Component.extend(Validations, {
  tagName: 'form',
  isUnique: computed('attributesForKey', 'attributeValue', function() {
    return isUniqueString(
      get(this, 'attributesForKey').mapBy('value'),
      get(this, 'attributeValue') || ''
    );
  }),

  actions: {
    add() {
      if (get(this, 'validations.isValid') && get(this, 'isUnique')) {
        get(this, 'addAttribute')(get(this, 'group'), get(this, 'attributeValue'));
        get(this, 'closeInput')();
      }
    },
    cancel() { get(this, 'closeInput')(); }
  }
});
