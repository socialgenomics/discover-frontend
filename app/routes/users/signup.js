import Ember from 'ember';
import ThirdParty from 'repositive/mixins/third-party-route-mixin';

export default Ember.Route.extend(ThirdParty, {
  session: Ember.inject.service(),
  beforeModel: function() {
    //if not verified transition to verify route
    if (!this.get('session').get('data.isVerified')) {
      this.transitionTo('landing-page');
    }
  }
});
