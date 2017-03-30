import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  model(params) {
    const helpPageLink = '/help/searching-for-data/' + params.query;
    return helpPageLink;
  },

  setupController(controller, model) {
    return controller.set('currentPage', model);
  }
});
