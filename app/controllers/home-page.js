import Ember from 'ember';

export default Ember.Controller.extend({
  cards: null,
  cards: function(){
    var ids= ["d5bfae2f-a08a-4b8b-9647-76c9f9247a36","a76266b2-5a7b-46f1-906f-d32da5076125","9c31881d-4c1d-44f2-a8e0-afc2ee800c91"]
    let cards = this.store.find('dataset',{ids:ids});
    return cards;
  }.property(),
});
