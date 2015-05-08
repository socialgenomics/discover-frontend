import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    var _this = this;
    return this.store.find('user', {username: params.username}).then(function(user){
      return _this.store.find('user.profile', {id: user.id});
    });
  }
});
