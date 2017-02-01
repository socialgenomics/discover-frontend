import Ember from 'ember';

const { Route, get, set } = Ember;

export default Route.extend({
  resetKey: null,
  model(params) {
    set(this, 'resetKey', params.resetKey);
  },
  setupController(controller) {
    set(controller, 'resetKey', get(this, 'resetKey'));
  }
});
