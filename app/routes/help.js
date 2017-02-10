import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  beforeModel(transition) {
    if (get(transition, 'targetName').split('.')[1] === 'index') {
      this.transitionTo('help.searching-for-data');
    }
  }
});
