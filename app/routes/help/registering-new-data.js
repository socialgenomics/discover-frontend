import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return '/help/registering-new-data/' + params.query;
  },

  setupController(controller, model) {
    return controller.set('currentPage', model);
  }
});
