import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';
import { isUniqueString } from '../utils/arrays';
import { openLinkInNewTab } from '../utils/links';

const { Component, computed, get, set, inject: { service }, Logger } = Ember;

const Validations = buildValidations({
  value: presenceValidator()
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
    isUnique: computed('attributesForKey', 'value', function() {
      return isUniqueString(
        get(this, 'attributesForKey').mapBy('value'),
        get(this, 'value') || ''
      );
    }),

    actions: {
      cancelEditMode() {
        this.resetModuleStateOnCancel('attribute', get(this, 'editablePropertyKeys'));
      },

      save() {
        if (get(this, 'validations.isValid') && get(this, 'isUnique')) {
          const attribute = get(this, 'attribute');
          const attrAction = get(this, 'store')
            .peekRecord('action', get(attribute, 'actionId'));
          set(attrAction, 'properties.value', get(this, 'value'));
          set(attribute, 'value', get(this, 'value'));
          return this.persistChanges(attrAction);
        }
      },

      deleteAttr() {
        const attribute = get(this, 'attribute');
        const attrAction = get(this, 'store')
          .peekRecord('action', get(attribute, 'actionId'));
        return attrAction.destroyRecord()
          .then(this._addFlashMessage('Attribute successfully deleted.', 'success'))
          .catch(Logger.error)
      },

      trackPubmedClick() {
        const url = `https://www.ncbi.nlm.nih.gov/pubmed/${get(this, 'attribute.value')}`
        get(this, 'metrics').trackEvent({
          category: 'discover_homeauth_datasetDetail',
          action: 'pubmedId',
          label: url
        });
        openLinkInNewTab(url);
      }
    }
  }
);
