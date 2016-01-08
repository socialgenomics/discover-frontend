import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.query('setting', { UserId: this.get('session.secure.user.id') });
  }
});
