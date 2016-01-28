import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model: function() {
    return new Ember.RSVP.all([
      this.store.findRecord('user', this.get('session.data.authenticatedUser')),
      this.store.findRecord('profile', this.get('session.data.authenticatedUser.ProfileId'))
    ])
    .then((values)=> {
      return {
        user: values[0],
        profile: values[1]
      };
    });
  }
});
