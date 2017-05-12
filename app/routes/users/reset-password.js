import Ember from 'ember';

const { Route, get, set } = Ember;

export default Route.extend({
  reset_key: null,
  model(params) {
    set(this, 'reset_key', params.reset_key);
  },
  setupController(controller) {
    set(controller, 'reset_key', get(this, 'reset_key'));
  }
});
