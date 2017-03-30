import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel() {
    return this.controllerFor('help.searching-for-data').set('currentPage', window.location.pathname);
  }
});
