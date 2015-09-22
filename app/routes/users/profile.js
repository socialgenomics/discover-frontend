import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(){
    var _this = this;
    var currentUser = this.get('session.secure.user');

    return new Ember.RSVP.all([
      this.store.find('user', currentUser.id),
      this.store.fine('profile', currentUser.id),
      this.store.query('profile', {UserId: currentUser.id}),
    ])
    .then(function(values){
      return {
        user: values[0],
        profile: values[1].get('firstObject'),
      }
    })
    .catch(function(err){
      Ember.Logger.error(err)
      return Ember.RSVP.reject(err);
    });
  },
  // model: function(){
  //   var currentUser = this.get('session.user');
  //   // return this.store.find('user',currentUser.id);
  //   return Ember.RSVP.hash({
  //     user: this.store.find('user',currentUser.id),
  //     profile: this.store.find('user.profile', {UserId: currentUser.id})
  //   });
  // },
});
