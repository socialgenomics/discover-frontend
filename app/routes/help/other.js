import Ember from 'ember';

const { Route, set } = Ember;

export default Route.extend({
  templateName: 'help/template',

  model(params) {
    return 'help/other/' + params.query;
  },

  setupController(controller, model) {
    return set(controller, 'currentPage', model);
  }
});
