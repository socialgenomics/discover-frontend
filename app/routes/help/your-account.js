import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  beforeModel(transition) {
    this.controllerFor('help.your-account').set('currentPage', window.location.pathname);
  }
});
