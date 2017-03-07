import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import EditModeMixin from 'repositive/mixins/edit-mode-mixin';
import Validations from 'repositive/validations/comment';

const { Component, computed: { oneWay }, get, set } = Ember;

export default Component.extend(
  CheckEditPermissionsMixin,
  EditModeMixin,
  Validations,
  {
    showCreateAccountModal: false,
    inEditMode: false,

    editablePropertyKeys: ['text'],

    checkEditPermissionsModel: oneWay('comment'),

    // copy of editable Properties
    text: oneWay('comment.properties.text'),

    actions: {
      toggleCreateAccountModal() {
        this.toggleProperty('showCreateAccountModal');
      },

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
