import Ember from 'ember';

export default Ember.Controller.extend({
  cards: null,
  cards: function(){
    var ids= ["6aba488e-d972-44f0-a994-3fab9a15cf9e","93def000-9c72-4d17-8a3f-702f41f0ef0f","e837fd0b-3072-4bb9-b9f5-f267cae469b4"];
    let cards = this.store.find('dataset',{ids:ids});
    return cards;
  }.property(),
});
