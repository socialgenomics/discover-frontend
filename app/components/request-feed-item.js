import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    this.$('.tooltipped').tooltip({ delay: 300 });
  },
  actions: {
    toggleModal() {
      this.sendAction('toggleModal');
    }
  }
});
