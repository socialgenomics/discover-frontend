import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    showErrors: function() {
      this.set("showError", true);
      console.log("showError is now "+this.showError+". MSG-FROM: validated-input");
    },
    focusedOut:function(){
      //put focussed out logic here
      console.log("you can have 2");
    },
    showHelpers:function(){
      //show helper text and label
      console.log("you can see helpers");
      
    },
    doBoth:function(){
      this.send('showErrors');
      this.send('focusedOut');
    },
  }
});
