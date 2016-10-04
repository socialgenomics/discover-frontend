import Ember from 'ember';

export default Ember.Controller.extend({
  showMore: false,

  actions: {
    showMoreMeta() {
      this.toggleProperty('showMore');
    }
  }
});
