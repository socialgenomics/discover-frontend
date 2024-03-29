import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';
import { buildValidations } from 'ember-cp-validations';
import emptyValidator from 'repositive/validations/emptyValidator';

const { Component, computed: { oneWay }, get, set } = Ember;
const Validations = buildValidations({ text: emptyValidator() });

export default Component.extend(
  CheckEditPermissionsMixin,
  EditModeMixin,
  Validations,
  {
    classNames: ['border-top'],

    inEditMode: false,

    checkEditPermissionsModel: oneWay('comment'),

    // copy of editable Properties
    text: oneWay('comment.properties.text'),

    init() {
      this._super(...arguments);

      set(this, 'editablePropertyKeys', ['text']);
    },

    actions: {
      cancelEditMode() {
        this.resetModuleStateOnCancel('comment.properties', get(this, 'editablePropertyKeys'));
      },

      save() {
        const comment = get(this, 'comment');

        set(comment, 'properties.text', get(this, 'text'));
        this.persistChanges(comment);
      },

      deleteComment(comment) {
        get(this, 'deleteAction')(comment);
      }
    }
  }
);
