import Ember from 'ember';

export default Ember.Component.extend({
  showMore: false,

  actions: {
    showMoreMeta() {
      this.toggleProperty('showMore');
    }
  }
});
