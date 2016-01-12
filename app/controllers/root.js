import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  firstVisit: Ember.computed.alias('session.data.firstVisit'),

  requestsSorted:  function() {
    return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
      sortProperties: ['updatedAt'],
      sortAscending: false,
      content: this.get('model.requests')
    });
  }.property('model.requests'),

  registrationsSorted:  function() {
    return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
      sortProperties: ['updatedAt'],
      sortAscending: false,
      content: this.get('model.registered')
    });
  }.property('model.registered'),

  actions : {
    // user clicks button on welcome page to enter site
    enterSite: function() {
      this.get('session').set('data.firstVisit', false);
    }
  }
});
