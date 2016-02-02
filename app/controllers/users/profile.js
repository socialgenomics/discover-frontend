import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  saved: false,
  actions: {
    save: function() {
      this.get('session.authenticatedUser').save();
      //this.get('session.authenticatedUser.profile').save();
      this.set('saved', true);
    }
  }
});
