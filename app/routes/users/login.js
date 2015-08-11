import Ember from 'ember';
import ThirdParty from 'repositive/mixins/third-party-route-mixin';

export default Ember.Route.extend(
//  ThirdParty,
{
  beforeModel: function(transition) {
//    if (this.get('session.isAuthenticated')) {
//      transition.abort();
//    }
  }
});
