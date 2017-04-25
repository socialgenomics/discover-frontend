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
  isNumber: computed.match('attributeValue', /^\d+$/),
  isValid: computed('group', 'validations.isValid', 'isNumber', function() {
    const validAndUnique = get(this, 'validations.isValid') && get(this, 'isUnique');
    if (get(this, 'group') === 'pmid' || get(this, 'group') === 'samples') {
      return validAndUnique && get(this, 'isNumber');
    }
    return validAndUnique;
  }),
  placeholder: computed('group', function() {
    const attrKey = get(this, 'group').toLowerCase();
    if (attrKey === 'assay') { return 'e.g. RNA-Seq'}
    if (attrKey === 'samples') { return 'e.g. 15'}
    if (attrKey === 'tissue') { return 'e.g. Blood'}
    if (attrKey === 'technology') { return 'e.g. Illumina HiSeq 2000'}
    if (attrKey === 'pmid') { return 'e.g. 24355041'}
  }),

  actions: {
    add() {
      if (get(this, 'isValid')) {
        get(this, 'addAttribute')(get(this, 'group'), get(this, 'attributeValue'));
        get(this, 'closeInput')();
      }
    },
    cancel() { get(this, 'closeInput')(); }
  }
});
