import Ember from 'ember';
const { inject: { service }, Controller, computed } = Ember;

export default Controller.extend({
  session: service(),
  isOwnProfile: computed('model.user.id', 'session.authenticatedUser.id', function() {
    const sessionUser = this.get('session.authenticatedUser.id');
    const profileUser = this.get('model.user.id');
    if (sessionUser === profileUser) {
      return true;
    }
  })
});
