import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(){
    var _this = this;
    var currentUser = this.get('session.user');

    return new Ember.RSVP.all([
      _this.store.find('user', currentUser.id),
      _this.store.find('user.profile', {UserId: currentUser.id}),
    ]).then(function(values){
      return {
        user: values[0],
        profile: values[1].get('firstObject'),
      }
    });
  },
  actions: {
    saveChanges: function() {
      console.log(this.get('model'));
    }
  }
});
