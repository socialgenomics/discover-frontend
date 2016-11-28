import Ember from 'ember';

const { inject: { service }, get, set } = Ember;

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  loading: false,
  isRootRoute: Ember.computed.alias('session.data.isRootRoute'),
  firstVisit: Ember.computed.alias('session.data.firstVisit'),
  displayWelcomeMessage: Ember.computed.alias('session.data.displayWelcomeMessage'),
  thirdPartySignup: Ember.computed.alias('session.data.thirdPartySignup'),
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
    },
    trackCreateAccount(route) {
      get(this, 'metrics').trackEvent({
        category: route,
        action: 'create account button',
        label: 'clicked'
      });
    }
  }
});
