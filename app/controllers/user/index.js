import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  isOwnProfile: function() {
    return parseInt(this.get('session.data.authenticatedUser.id')) === this.get('model.user.id');
  }.property('model'),

  actions: {

  }
});
