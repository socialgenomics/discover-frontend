import Ember from 'ember';
import ThirdParty from 'repositive/mixins/third-party-route-mixin';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(ThirdParty, {
  session: service(),
  beforeModel: function() {
    if (get(this, 'session.isAuthenticated')) {
      this.transitionTo('root');
    }
  }
});
