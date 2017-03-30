import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel() {
    return this.controllerFor('help.requesting-data').set('currentPage', window.location.pathname);
  }
});
