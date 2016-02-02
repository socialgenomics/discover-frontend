import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model: function() {
    return this.store.query('setting', { UserId: this.get('session.data.authenticatedUser.id') });
  }
});
