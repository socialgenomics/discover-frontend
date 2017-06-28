import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return 'help/your-account/' + params.query;
  },

  setupController(controller, model) {
    return controller.set('currentPage', model);
  }
});
