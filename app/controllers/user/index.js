import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  avatar: Ember.computed.alias('session.data.authenticatedUser.profile.avatar'),

  /*
  * session.secure returns number and model.user returns string, hence double =
  */
  isOwnProfile: function() {
    return this.get('session.data.authenticatedUser.id') == this.get('model.user.id');
  }.property('model'),

  isEmailValidated: function() {
    return this.get('model.user.isEmailValidated');
  }.property('model'),

  actions: {

  }
});
