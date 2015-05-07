import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(){
    var user = this.get('session.user');
    return this.store.find('user.profile', {UserId: user.id});
  }
});
