import Ember from 'ember';

export default Ember.Controller.extend({
  cards: null,
  cards: function(){
    var ids= ["d5bfae2f-a08a-4b8b-9647-76c9f9247a36","a76266b2-5a7b-46f1-906f-d32da5076125","9c31881d-4c1d-44f2-a8e0-afc2ee800c91"];
    //var ids= ["20af3bf4-8a3a-4180-9e57-3?9c703338f31","f5b7857d-208e-4acc-ac4d-4c2520814fe1","06d0a3?0d-676b-4607-8d51-230dd05371df"];
    let cards = this.store.find('dataset',{ids:ids});
    return cards;
  }.property(),
});
