import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  beforeModel: function(transition) {
    this.get('session').set('data.firstVisit', false);
    console.log('First visit is ' + this.get('session.data.firstVisit'));
    if (this.get('session.data.firstVisit', false)) {
      this.transitionTo('root');
    }
  },

  model: function() {
    let user = this.get('session.session.content.authenticated.user');
    return {
      cred: user.credentials[0],
      name: user.firstname + ' ' + user.lastname
    };
  }
});
