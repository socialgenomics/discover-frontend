import Ember from 'ember';

export default Ember.Component.extend({
  showFullDescription: false,

  actions: {
    toggleDescription() {
      this.toggleProperty('showFullDescription');
    }
  }
});
