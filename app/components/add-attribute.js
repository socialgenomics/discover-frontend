import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import duplicateValidator from 'repositive/validations/duplicateValidator';

const { Component, get } = Ember;
const Validations = buildValidations({
  attributeValue: [
    presenceValidator('You must enter a value.')
  ]
});

export default Component.extend(Validations, {
  actions: {
    addAttribute() {
      get(this, 'addAttribute')(get(this, 'group'), get(this, 'attributeValue'));
      get(this, 'closeInput')();
    },
    cancel() { get(this, 'closeInput')(); }
  }
});
