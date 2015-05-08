import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    addComment: function(text){
      this.sendAction('addComment',text);
    },
  }
});
