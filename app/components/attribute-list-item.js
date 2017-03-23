import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';

const { Component, computed, get, set } = Ember;

const Validations = buildValidations({
  value: presenceValidator('You must enter a value.')
});

export default Component.extend(
  CheckEditPermissionsMixin,
  EditModeMixin,
  Validations,
  {
    value: computed.oneWay('attribute.value'),
    editablePropertyKeys: ['value'],
    checkEditPermissionsModel: computed.oneWay('attribute'),
    isNotUnique: computed('attributesForKey', 'value', function() {
      const attrInput = (get(this, 'value') || '').toLowerCase();
      return get(this, 'attributesForKey')
        .any(attr => attr.value.toLowerCase() === attrInput);
    }),
    actions: {
      cancelEditMode() {
        this.resetModuleStateOnCancel('attribute.value', get(this, 'editablePropertyKeys'));
      },

      save() {
        const attribute = get(this, 'attribute');
        set(attribute, 'value', get(this, 'value'));
        this.persistChanges(attribute);
      }
    }
  }
);
