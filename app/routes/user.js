import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.query('user', { username: params.username }).then(users => {
      let user = users.get('firstObject');
      return new Ember.RSVP.all([
        this.store.query('profile', { UserId: user.get('id') }),
        this.store.query('dataset', { UserId: user.get('id'), isRequest: 1 }),
        this.store.query('dataset', { UserId: user.get('id'), isRequest: 0 })
      ])
      .then(values => {
        return {
          user: user,
          profile: values[0].get('firstObject'),
          requests: values[1],
          registrations: values[2]
        };
      });
    });
  }
});
