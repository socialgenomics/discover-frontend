import Ember from 'ember';

export default Ember.Controller.extend({
  isOwnProfile: function(){
    return this.get('session.secure.user.id') == this.get('model.user.id');
  }.property('model'),

  isEmailValidated: function() {
    if (this.get('session.secure.user.isEmailValidated')) {
        return true;
    }
  },

  actions:{

  },
});
