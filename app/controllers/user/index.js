import Ember from 'ember';

export default Ember.Controller.extend({
  isModalShown:false,

  isOwnProfile: function(){
    return this.get('session.secure.user.id') == this.get('model.user.id');
  }.property('model'),

  actions:{
    toggleModal(){
      this.toggleProperty('isModalShown');
    },
  },
});
