import Ember from 'ember';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  beforeModel() {
    this.transitionTo('policies.web');
  }
});
