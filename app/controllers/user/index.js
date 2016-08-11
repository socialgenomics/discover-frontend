import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  isOwnProfile: Ember.computed('model.user.id', 'session.authenticatedUser.id', function() {
    const sessionUser = this.get('session.authenticatedUser.id');
    const profileUser = this.get('model.user.id');
    if (sessionUser === profileUser) {
      return true;
    }
  })
});
