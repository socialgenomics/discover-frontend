import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tab'],
  tab: "comments",
  actions: {
    addComment:function(text){
      var cmnt = this.store.createRecord('comment', {
        text:text,
      });
      cmnt.save();
    }
  },
});
