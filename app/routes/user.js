import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    var _this = this;
    return this.store.find('user',{username:params.username}).then(function(user){
      var user = user.get('firstObject');
      return new Ember.RSVP.all([
        _this.store.find('user', {username: params.username}),
        _this.store.find('profile', {userId: user.get('id')}),
        _this.store.find('dataset',{userId: user.get('id')}),
      ]).then(function(values){
        return {
          user:values[0].get('firstObject'),
          profile:values[1].get('firstObject'),
          datasets:values[2],
        }
      });
    }).catch(function(err){
      return Ember.RSVP.reject("Sorry, we cannot find a user with this username.");
    });
  },
});
