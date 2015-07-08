import Ember from 'ember';

export default Ember.View.extend({
  afterRenderEvent: function(){
    //dropdown initialization
    this.$('.tooltipped').tooltip({delay: 10});
  }
});
