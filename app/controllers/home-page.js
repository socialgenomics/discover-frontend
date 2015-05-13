import Ember from 'ember';

export default Ember.Controller.extend({
  cards: function(){
    var ids= ["3607ecaf-852d-4cd5-b696-5114edc94f78","80fcd240-c619-47de-ab16-cf0be04c76a7","a5d5443c-a898-4d8f-b642-29f9713a21e2"]
    let cards = this.store.find('dataset',{ids:ids});
    return cards;
  }.property(),
  actions:{

  }
});
