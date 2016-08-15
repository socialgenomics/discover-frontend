import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  loading: false,
  firstVisit: Ember.computed.alias('session.data.firstVisit'),
  displayWelcomeMessage: Ember.computed.alias('session.data.displayWelcomeMessage'),
  sortUpdatedAt: ['updatedAt:desc'],
  requestsSorted: Ember.computed.sort('model.requests', 'sortUpdatedAt'),
  registrationsSorted: Ember.computed.sort('model.registered', 'sortUpdatedAt'),
  datasetsNumber: Ember.computed('model.stats.datasets', function() {
    const x = this.get('model.stats.datasets');
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }),

  actions : {
    // user clicks button on welcome page to enter site, displays welcome flash message
    enterSite: function() {
      // this.get('session').set('data.firstVisit', false);
      this.flashMessages.add({
        message: 'Please check your email to verify your account',
        type: 'info',
        timeout: 7000,
        sticky: true,
        class: 'fadeIn'
      });
    }
  }
});
