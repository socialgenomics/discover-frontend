import Ember from 'ember';
import ThirdParty from 'repositive/mixins/third-party-route-mixin';

export default Ember.Route.extend(ThirdParty, {
  session: Ember.inject.service(),
  beforeModel: function(transition) {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('root');
      // transition.abort();
    }
  }
});
