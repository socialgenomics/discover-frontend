import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  click: function(){
    //sends to application.js route's showModal method
    this.sendAction();
  },
});
