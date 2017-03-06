import Ember from 'ember';

const { computed, get, inject: { service }, Mixin } = Ember;

export default Mixin.create({
  session: service(),

  canEdit: computed('session.authenticatedUser', 'checkEditPermissionsModel', function () {
    const userId = get(this, 'session.authenticatedUser.id');
    const authorId = get(this, 'checkEditPermissionsModel.userId.id');

    return userId !== undefined && authorId !== undefined && userId === authorId;
  })
});
