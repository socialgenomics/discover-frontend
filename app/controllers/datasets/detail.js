import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tab'],
  tab: "comments",

  actions: {
    addComment: function(text){
      console.log("comment is added");
      console.log(text);
      // this.store.push('comment',{
      //   text:text
      // })
      
    },
  },
});
