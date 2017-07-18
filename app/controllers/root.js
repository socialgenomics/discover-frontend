import Ember from 'ember';

const { Controller, inject: { service }, get, computed } = Ember;

export default Controller.extend({
  session: service(),

  sortUpdatedAt: ['updatedAt:desc'],
  loading: false,

  isRootRoute: computed.alias('session.data.isRootRoute'),
  firstVisit: computed.alias('session.data.firstVisit'),
  displayWelcomeMessage: computed.alias('session.data.displayWelcomeMessage'),
  thirdPartySignup: computed.alias('session.data.thirdPartySignup'),
  requestsSorted: computed.sort('model.requests', 'sortUpdatedAt'),
  registrationsSorted: computed.sort('model.registered', 'sortUpdatedAt'),

  datasetsNumber: computed('model.stats.datasets', function() {
    const x = get(this, 'model.stats.datasets');
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }),

  actions: {
    trackCreateAccount(eventName) {
      get(this, 'metrics').trackEvent({
        category: eventName,
        action: 'button clicked'
      });
    }
  }
});
