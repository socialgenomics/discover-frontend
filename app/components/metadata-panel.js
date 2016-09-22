import Ember from 'ember';

export default Ember.Component.extend({
  displayInfo: true,

  actions: {
    showInfo() {
      this.set('displayInfo', true);
    },

    showFilters() {
      this.set('displayInfo', false);
    }
  }
});
