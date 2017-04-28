import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { buildValidations } from 'ember-cp-validations';
import emptyValidator from 'repositive/validations/emptyValidator';

const { Component, computed: { oneWay }, get, set, Logger } = Ember;
const Validations = buildValidations({ text: emptyValidator() });

export default Component.extend(
  CheckEditPermissionsMixin,
  EditModeMixin,
  Validations,
  FlashMessageMixin,
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
      },

      deleteComment(comment) {
        comment.destroyRecord()
        .then(() => {
          this._addFlashMessage('Comment successfully deleted.', 'success');
        })
        .catch(() => {
          this._addFlashMessage('Comment could not be deleted. Please try again.', 'warning');
          Logger.error;
        });
      }
    }
  }
);
