import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service(),

  actions: {
    // user clicks button on welcome page to enter site
    // enterSite: function() {
    //   this.get('session').set('data.firstVisit', false);
    // }
  }
});
