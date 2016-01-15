import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model: function() {
    var currentUser = this.get('session.data.authenticated.user');

    return new Ember.RSVP.all([
      this.store.findRecord('user', currentUser.id),
      this.store.query('profile', { UserId: currentUser.id })
    ])
    .then((values)=> {
      return {
        user: values[0],
        profile: values[1].get('firstObject')
      };
    });
  }
});
