import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return '/help/other/' + params.query;
  },

  setupController(controller, model) {
    return controller.set('currentPage', model);
  }
});
