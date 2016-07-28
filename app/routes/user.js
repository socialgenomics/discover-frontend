import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findRecord('user', params.id)
    .then(user => {
      return new Ember.RSVP.all([
        user,
        this.store.query('userProfile', { user_id: user.get('id') }),
        this.store.query('dataset', { user_id: user.get('id') }),
        this.store.query('request', { user_id: user.get('id') })
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
      Ember.Logger.err(err);
    });
  }
});
