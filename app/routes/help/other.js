import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  beforeModel() {
    return this.controllerFor('help.other').set('currentPage', window.location.pathname);
  }
});
