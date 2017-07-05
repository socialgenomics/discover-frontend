import Ember from 'ember';

const { Route, set } = Ember;

export default Route.extend({
  controllerName: 'help',

  model(params) {
    return 'help/registering-new-data/' + params.query;
  },

  setupController(controller, model) {
    return set(controller, 'currentPage', model);
  }
});
