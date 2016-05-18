import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service(),

  beforeModel: function(transition) {
    this.get('session').set('data.firstVisit', false);
    console.log('First visit is ' + this.get('session.data.firstVisit'));
    if (this.get('session.data.firstVisit', false)) {
      this.transitionTo('root');
    }
  }
});
