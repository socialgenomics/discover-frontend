import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    return this.store.find('user',{username:params.username}).then(function(user){
      var user = user.get('firstObject');
      return new Ember.RSVP.all([
        this.store.query('user', {username: params.username}),
        this.store.query('profile', {UserId: user.get('id')}),
        this.store.query('dataset',{UserId: user.get('id')}),
      ])
      .then(function(values){
        return {
          user: values[0].get('firstObject'),
          profile: values[1].get('firstObject'),
          datasets: values[2],
        }
      });
    }.bind(this))
    .catch(function(err){
      Ember.Logger.error(err)
      return Ember.RSVP.reject("Sorry, we cannot find a user with this username.");
    });
  },
});
