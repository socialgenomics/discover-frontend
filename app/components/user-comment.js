import Ember from 'ember';
import CheckEditPermissionsMixin from 'repositive/mixins/check-edit-permissions-mixin';

const { Component, computed: { oneWay } } = Ember;

export default Component.extend(CheckEditPermissionsMixin, {
  showCreateAccountModal: false,

  checkEditPermissionsModel: oneWay('comment'),

  actions: {
    toggleCreateAccountModal() {
      this.toggleProperty('showCreateAccountModal');
    }
  }
});
