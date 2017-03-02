import Ember from 'ember';

const { computed, get, inject: { service }, Mixin } = Ember;

export default Mixin.create({
  session: service(),

  canEdit: computed('session.authenticatedUser', function () {
    return get(this, 'session.authenticatedUser.id') === get(this, 'checkEditPermissionsModel.userId.id');
  })
});
