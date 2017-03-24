import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';

const { Component, computed, get, set, inject: { service } } = Ember;

const Validations = buildValidations({
  value: presenceValidator('You must enter a value.')
});

export default Component.extend(
  CheckEditPermissionsMixin,
  EditModeMixin,
  Validations,
  {
    store: service(),

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
        this.resetModuleStateOnCancel('attribute', get(this, 'editablePropertyKeys'));
      },

      save() {
        if (get(this, 'validations.isValid') && !get(this, 'isNotUnique')) {
          const attribute = get(this, 'attribute');
          const attrAction = get(this, 'store')
            .peekRecord('action', get(attribute, 'actionId'));
          set(attrAction, 'properties.value', get(this, 'value'));
          set(attribute, 'value', get(this, 'value'));
          return this.persistChanges(attrAction);
        }
      }
    }
  }
);
