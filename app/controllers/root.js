import Ember from 'ember';

const { Controller, inject: { service }, get, computed } = Ember;

export default Controller.extend({
  session: service(),
  
  loading: false,
  isRootRoute: computed.alias('session.data.isRootRoute'),
  firstVisit: computed.alias('session.data.firstVisit'),
  displayWelcomeMessage: computed.alias('session.data.displayWelcomeMessage'),
  thirdPartySignup: computed.alias('session.data.thirdPartySignup'),
  sortUpdatedAt: ['updatedAt:desc'],
  requestsSorted: computed.sort('model.requests', 'sortUpdatedAt'),
  registrationsSorted: computed.sort('model.registered', 'sortUpdatedAt'),
  datasetsNumber: computed('model.stats.datasets', function() {
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
        sticky: true
      });
    },
    trackCreateAccount(eventName) {
      get(this, 'metrics').trackEvent({
        category: eventName,
        action: 'button clicked'
      });
    },
    search(serializedTree) {
      this.transitionToRoute('datasets.search', {
        queryParams: {
          query: serializedTree,
          page: 1
        }
      });
    }
  }
});
