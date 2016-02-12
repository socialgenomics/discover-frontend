import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  /*
  * session.secure returns number and model.user returns string, hence double =
  */
  isOwnProfile: function() {
    return this.get('session.authenticatedUser.id') == this.get('model.user.id');
  }.property('model'),

  actions: {

  }
});
