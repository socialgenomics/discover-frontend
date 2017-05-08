import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import emptyValidator from 'repositive/validations/emptyValidator';

const { Component, get, set } = Ember;

const Validations = buildValidations({ tag: emptyValidator() });

export default Component.extend(Validations, {
  tag: null,

  actions: {
    addTag: function() {
      if (get(this, 'validations.isValid')) {
        get(this, 'metrics').trackEvent({
          category: 'discover_homeauth_datasetDetail_tag',
          action: 'added_tag',
          label: this.tag
        });
        this.sendAction('addTag', this.tag);
      }
      set(this, 'tag', null);
      this.toggleProperty('isOpen');
    },

    toggleInput: function() {
      this.toggleProperty('isOpen');
    }
  }
});
