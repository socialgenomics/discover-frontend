import Ember from 'ember';
import ThirdParty from '../mixins/third-party-route-mixin';

const { inject: { service }, Route } = Ember;

export default Route.extend(ThirdParty, {
  session: service(),

  beforeModel: function() {
    if (this.get('session.isAuthenticated')) {
      this.transitionToExternal('root');
    }
  }
});
