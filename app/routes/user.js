import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    return this.store.find('user',{username:params.username}).then(function(user){
      var user = user.get('firstObject');
      return new Ember.RSVP.all([
        this.store.query('profile', {UserId: user.get('id')}),
        this.store.query('dataset',{UserId: user.get('id'), isRequest:1}),
        this.store.query('dataset',{UserId: user.get('id'), isRequest:0}),
      ])
      .then(function(values){
        return {
          user: user,
          profile: values[0].get('firstObject'),
          requests: values[1],
          registrations: values[2],
        };
      });
    }.bind(this))
    .catch(function(err){
      Ember.Logger.error(err);
      return Ember.RSVP.reject("Sorry, we cannot find a user with this username.");
    });
  },
});
