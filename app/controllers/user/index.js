import Ember from 'ember';

export default Ember.Controller.extend({

  currentUser: Ember.computed(function() {
    return this.get('session.secure.user');
  }),

  /*
  * session.secure returns number and model.user returns string, hence double =
  */
  isOwnProfile: function() {
    return this.get('session.secure.user.id') == this.get('model.user.id');
  }.property('model'),

  isEmailValidated: function() {
    return this.get('model.user.isEmailValidated');
  }.property('model'),

  actions: {

  }
});
