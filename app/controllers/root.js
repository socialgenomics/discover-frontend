import Ember from 'ember';

const { Controller, inject: { service }, get, computed } = Ember;

export default Controller.extend({
  session: service(),

  sortUpdatedAt: ['updatedAt:desc'],
  loading: false,

  isRootRoute: computed.alias('session.data.isRootRoute'),
  firstVisit: computed.alias('session.data.firstVisit'),
  thirdPartySignup: computed.alias('session.data.thirdPartySignup'),
  requestsSorted: computed.sort('model.requests', 'sortUpdatedAt'),
  registrationsSorted: computed.sort('model.registered', 'sortUpdatedAt'),

  actions: {
    trackCreateAccount(eventName) {
      get(this, 'metrics').trackEvent({
        category: eventName,
        action: 'button clicked'
      });
    }
  }
});
