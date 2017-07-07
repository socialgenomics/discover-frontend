import Ember from 'ember';

const { Route, set } = Ember;

export default Route.extend({
  templateName: 'help/template',

  model(params) {
    return 'help/requesting-data/' + params.query;
  },

  setupController(controller, model) {
    return set(controller, 'currentPage', model);
  }
});
