import Ember from 'ember';

export default Ember.Controller.extend({
  isModalShown:false,

  isOwnProfile: function(){
    return this.get('session.currentUser.id') == this.get('model.user.id');
  }.property('model'),

  requested: function(){
    var datasets = this.get('model.datasets');
    return datasets.filterBy('isRequest', true);
  }.property(),

  registered: function(){
    var datasets = this.get('model.datasets');
    return datasets.filterBy('isRequest', false);
  }.property(),

  actions:{
    toggleModal(){
      this.toggleProperty('isModalShown');
    },
  },
});
