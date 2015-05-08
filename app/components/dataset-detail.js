import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    addComment: function(text){
      console.log("comment is added");
      console.log(text);

      // this.store.push('comment',{
      //   text:text
      // })
      var cmnt = this.store.createRecord('comment', {
        text:text,
      });
      cmnt.save();
    },
  }
});
