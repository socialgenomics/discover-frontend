import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';

const { Component, computed: { oneWay }, get, set } = Ember;
const Validations = buildValidations({ text: presenceValidator() });

export default Component.extend(
  CheckEditPermissionsMixin,
  EditModeMixin,
  Validations,
  {
    classNames: ['u-border-top'],

    inEditMode: false,

    editablePropertyKeys: ['text'],

    checkEditPermissionsModel: oneWay('comment'),

    // copy of editable Properties
    text: oneWay('comment.properties.text'),

    actions: {
      cancelEditMode() {
        this.resetModuleStateOnCancel('comment.properties', get(this, 'editablePropertyKeys'));
      },

      save() {
        const comment = get(this, 'comment');

        set(comment, 'properties.text', get(this, 'text'));
        this.persistChanges(comment);
      }
    }
  }
);
