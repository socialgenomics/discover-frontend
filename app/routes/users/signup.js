import Ember from 'ember';
import ThirdParty from 'repositive/mixins/third-party-route-mixin';

export default Ember.Route.extend(ThirdParty, {
  session: Ember.inject.service(),
  beforeModel: function() {
    if (!this.get('session').get('data.hasInvite')) {
      this.transitionTo('landing-page');
    }
  }
});
