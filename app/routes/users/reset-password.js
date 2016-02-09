import Ember from 'ember';

export default Ember.Route.extend({
  resetKey: null,
  model: function(params) {
    this.set('resetKey', params.resetKey);
  },
  setupController: function(controller /* model */) {
    controller.set('resetKey', this.get('resetKey'));
  }
});
