import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.query('user', { id: params.id }).then(users => {
      let user = users.get('firstObject');
      return new Ember.RSVP.all([
        this.store.query('userProfile', { user_id: user.get('id') }),
        this.store.query('dataset', { user_id: user.get('id')}),
      ])
      .then(values => {
        return {
          user: user,
          user_profile: values[0].get('firstObject'),
          requests: [],
          registrations: values[1]
        };
      });
    });
  }
});
