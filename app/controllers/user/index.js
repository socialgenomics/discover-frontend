import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  isOwnProfile: function() {
    const sessionUser = this.get('session.authenticatedUser.id');
    const profileUser = this.get('model.user.id');
    if (sessionUser === profileUser) {
      return true;
    }
  }.property('id'),

  actions: {

  }
});
