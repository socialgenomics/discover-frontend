import Ember from 'ember';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';

const { Route, get } = Ember;

export default Route.extend(ResetScrollMixin, {
  beforeModel(transition) {
    if (get(transition, 'targetName').split('.').length === 1) {
      this.transitionTo('policies.web');
    }
  }
});
