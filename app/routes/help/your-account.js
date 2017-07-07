import Ember from 'ember';

const { Route, set } = Ember;

export default Route.extend({
  templateName: 'help/template',

  model(params) {
    return 'help/your-account/' + params.query;
  },

  setupController(controller, model) {
    return set(controller, 'currentPage', model);
  }
});
