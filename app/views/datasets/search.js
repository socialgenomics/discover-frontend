import Ember from 'ember';

export default Ember.View.extend({
  afterRenderEvent: function(){
    this.$('.tooltipped').tooltip({delay: 10});
  }
});
