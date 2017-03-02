import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { validator, buildValidations } from 'ember-cp-validations';

const { Component, computed: { oneWay }, get, set, setProperties } = Ember;
const Validations = buildValidations({
  text: validator('presence', {
    presence: true,
    message: 'This field can\'t be blank.'
  })
});

export default Component.extend(
  CheckEditPermissionsMixin,
  FlashMessageMixin,
  Validations,
  {
    showCreateAccountModal: false,
    inEditMode: false,

    checkEditPermissionsModel: oneWay('comment'),
    text: oneWay('comment.properties.text'),

    actions: {
      toggleCreateAccountModal() {
        this.toggleProperty('showCreateAccountModal');
      },

      enterEditMode() {
        set(this, 'inEditMode', true);
      },

      cancelEditMode() {
        setProperties(this, {
          inEditMode: false,
          text: get(this, 'comment.properties.text')
        });
      },

      save() {
        const comment = get(this, 'comment');

        set(comment, 'properties.text', get(this, 'text'));
        comment
          .save()
          .then(this._onEditSuccess.bind(this))
          .catch(this._onEditError.bind(this));
      }
    },

    _onEditSuccess() {
      set(this, 'inEditMode', false);
      this._addFlashMessage('Your comment has been updated.', 'success');
    },
    _onEditError() {
      get(this, 'comment').rollbackAttributes();
      set(this, 'inEditMode', false);
      this._addFlashMessage('There was problem while updating your comment.', 'warning');
    }
  }
);
