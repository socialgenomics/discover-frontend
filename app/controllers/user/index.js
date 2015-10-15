import Ember from 'ember';

export default Ember.Controller.extend({

  isOwnProfile: function(){
    return this.get('session.secure.user.id') == this.get('model.user.id');
  }.property('model'),

  validAccount: function() {
    if (this.get('isEmailValidated', true)) {
      return true;
    }
  },

  actions:{
    seenBanner: function() {
      this.set('bannerSeen', true);
    }
  },
});
