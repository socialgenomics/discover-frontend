import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  firstVisit: Ember.computed.alias('session.data.firstVisit'),
  requestsSorted: Ember.computed.sort('model.requests', 'updatedAt'),
  registrationsSorted:  Ember.computed.sort('model.requests', 'updatedAt'),

  actions : {
    // user clicks button on welcome page to enter site
    enterSite: function() {
      this.get('session').set('data.firstVisit', false);
    }
  }
});
