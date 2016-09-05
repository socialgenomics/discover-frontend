import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    showMoreMeta() {
      this.toggleProperty('showMore');
      this.sendAction('action', this.get('param'));
    }
  }
});
