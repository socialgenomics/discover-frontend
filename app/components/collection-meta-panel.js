import Ember from 'ember';

export default Ember.Component.extend({
  displayInfo: true,
  repositiveSourceId: 'ebb9c7a7-2287-49c4-8b2a-a507392637d9',
  actions: {
    showInfo() {
      this.set('displayInfo', true);
    },

    showFilters() {
      this.set('displayInfo', false);
    }
  }
});
