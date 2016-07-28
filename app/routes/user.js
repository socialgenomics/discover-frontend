import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findRecord('user', params.id)
    .then(user => {
      const userId = user.get('id');
      return new Ember.RSVP.all([
        user,
        this.store.query('userProfile', {'user_id': userId}),
        this.store.query('dataset', {'user_id': userId}),
        this.store.query('request', {'user_id': userId})
      ]);
    })
    .then(values => {
      return {
        user: values[0],
        user_profile: values[1].get('firstObject'),
        registrations: values[2],
        requests: values[3]
      };
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  }
});
