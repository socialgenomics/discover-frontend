import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  currentUser: Ember.computed(function() {
    return this.get('session.data.authenticated.user');
  }),

  isOwnProfile: function() {
    return this.get('session.data.authenticated.user.id') === this.get('model.user.id');
  }.property('model'),

  isEmailValidated: function() {
    return this.get('model.user.isEmailValidated');
  }.property('model'),

  actions: {

  }
});
