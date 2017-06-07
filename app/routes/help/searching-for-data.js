import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  controllerName: 'help',

  model(params) {
    return 'help/searching-for-data/' + params.query;
  },

  setupController(controller, model) {
    return controller.set('currentPage', model);
  }
});
