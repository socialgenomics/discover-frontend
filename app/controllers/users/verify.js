import Ember from 'ember';

export default Ember.Controller.extend({

  currentUser: Ember.computed(function() {
    return this.get('session.secure.user');
  })
});
