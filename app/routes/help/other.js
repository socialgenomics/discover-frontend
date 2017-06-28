import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  templateName: 'help/template',

  model(params) {
    return 'help/other/' + params.query;
  },

  setupController(controller, model) {
    return controller.set('currentPage', model);
  }
});
