import Ember from 'ember';

export default Ember.View.extend({
  afterRenderEvent: function(){
    this.get('controller').on('modelLoaded', this, ()=>{
      this.$('.tooltipped').tooltip({delay: 300});
    });
  }
});
