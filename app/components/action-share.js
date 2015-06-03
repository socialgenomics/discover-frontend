import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  click: function(){
    //sends to application.js route's showModal method
    this.sendAction('action', "Sorry, sharing is currently being developed. In the meantime you can share the url of the full dataset.");
  },
});
