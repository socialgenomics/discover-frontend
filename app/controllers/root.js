import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';

export default Ember.Controller.extend(
  EmberValidations,
  ServerValidationMixin,
{
  session: Ember.inject.service(),
  loading: false,
  firstVisit: Ember.computed.alias('session.data.firstVisit'),
  displayWelcomeMessage: Ember.computed.alias('session.data.displayWelcomeMessage'),
  sortUpdatedAt: ['updatedAt:desc'],
  requestsSorted: Ember.computed.sort('model.requests', 'sortUpdatedAt'),
  registrationsSorted: Ember.computed.sort('model.registered', 'sortUpdatedAt'),

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
