import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    const helpPageLink = '/help/requesting-data/' + params.query;
    return helpPageLink;
  },

  setupController(controller, model) {
    return controller.set('currentPage', model);
  }
});
