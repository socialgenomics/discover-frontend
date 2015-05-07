import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    var user = this.get('session.user', {username: params.username});
    // TODO: HOW CAN I QUERY VIA A RELATION??
    return this.store.find('user.profile', {UserId: user.id});
  }
});
