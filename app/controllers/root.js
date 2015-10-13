import Ember from 'ember';

export default Ember.Controller.extend({
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
});
