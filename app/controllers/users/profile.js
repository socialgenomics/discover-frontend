import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  avatar: Ember.computed.alias('session.data.authenticatedUser.profile.avatar'),
  saved: false,
  actions: {
    save: function() {
      this.get('model.user').save();
      this.get('model.profile').save();
      this.set('saved', true);
    }
  }
});
