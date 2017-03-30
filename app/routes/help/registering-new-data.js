import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel() {
    return this.controllerFor('help.registering-new-data').set('currentPage', window.location.pathname);
  }
});
