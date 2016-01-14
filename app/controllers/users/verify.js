import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  currentUser: Ember.computed(function() {
    return this.get('session.data.authenticated.user');
  })
});
