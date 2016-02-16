import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(
  EmberValidations,
{
  session: Ember.inject.service(),
  firstname: Ember.computed.alias('session.authenticatedUser.firstname'),
  lastname: Ember.computed.alias('session.authenticatedUser.lastname'),
  affiliation: Ember.computed.alias('session.authenticatedUser.profile.workOrganisation'),
  saved: false,
  validations: {
    firstname: {
      presence: {
        message: 'Can\'t be blank.'
      }
    },
    lastname: {
      presence: {
        message: 'can\'t be blank'
      }
    }
  },
  actions: {
    save: function() {
      this.get('session.authenticatedUser').save();
      //this.get('session.authenticatedUser.profile').save();
      this.set('saved', true);
    }
  }
});
