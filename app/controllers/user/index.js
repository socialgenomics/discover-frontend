import Ember from 'ember';
const { inject: { service }, Controller, computed, get } = Ember;

export default Controller.extend({
  session: service(),
  user: computed.alias('model.user'),
  isOwnProfile: computed('model.user.id', 'session.authenticatedUser.id', function() {
    const sessionUser = get(this, 'session.authenticatedUser.id');
    const profileUser = get(this, 'model.user.id');
    if (sessionUser === profileUser) {
      return true;
    }
  })
});
