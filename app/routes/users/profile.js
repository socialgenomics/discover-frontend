import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model: function() {
    var currentUser = this.get('session.data.authenticated.user');

    return new Ember.RSVP.all([
      this.store.findRecord('user', currentUser.id),
      this.store.query('profile', { UserId: currentUser.id })
    ])
    .then((values)=> {
      return {
        user: values[0],
        profile: values[1].get('firstObject')
      };
    })
    .catch((err)=> {
      Ember.Logger.error(err);
      return Ember.RSVP.reject(err);
    });
  }
  // model: function(){
  //   var currentUser = this.get('session.user');
  //   // return this.store.find('user',currentUser.id);
  //   return Ember.RSVP.hash({
  //     user: this.store.find('user',currentUser.id),
  //     profile: this.store.find('user.profile', {UserId: currentUser.id})
  //   });
  // },
});
