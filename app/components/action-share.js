import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  click: function(){
    calq.action.track(
      "Dataset.Share"
    );
    //sends to showModal in parent controller
    this.sendAction();
  },
});
