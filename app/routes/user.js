import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      _this.store.find('user', {username: params.username}).then(function(results){
        var user = results.get('firstObject');
        _this.store.find('user.profile', {userId: user.get('id')}).then(function(results){
          var profile = results.get('firstObject');
          resolve({
            profile: profile,
            user: user,
          });
        });
      });
    });
  }
});
