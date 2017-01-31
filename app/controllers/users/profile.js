import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(
  EmberValidations,
{
  session: Ember.inject.service(),
  firstname: Ember.computed.alias('session.authenticatedUser.firstname'),
  lastname: Ember.computed.alias('session.authenticatedUser.lastname'),
  affiliation: Ember.computed.alias('session.authenticatedUser.userProfile.workOrganisation'),
  validations: {
    firstname: {
      presence: {
        message: 'Can\'t be blank.'
      }
    },
    lastname: {
      presence: {
        message: 'Can\'t be blank'
      }
    }
  },
  isValid: Ember.computed.and(
    'firstname',
    'lastname'
  ),
  infoHasChanged: Ember.computed.or(
    'session.authenticatedUser.currentState.isDirty',
    'session.authenticatedUser.profile.currentState.isDirty'
  ),

  isSavable: Ember.computed('isValid', 'infoHasChanged', function() {
    const isValid = this.get('isValid');
    const infoHasChanged = this.get('infoHasChanged');
    if (isValid && infoHasChanged) {
      return true;
    }
    return false;
  }),

  actions: {
    save: function() {
      const user = this.get('session.authenticatedUser');
      if (this.isSavable) {
        user.save()
        .then((resp) => {
          return resp.profile.save();
        })
        .then(() => {
          this.flashMessages.add({
            message: 'Your profile has been updated.',
            type: 'success',
            timeout: 7000,
            class: 'fadeInOut'
          });
        })
        .catch((err) => {
          Ember.Logger.error(err);
          this.flashMessages.add({
            message: 'Sorry. There was a problem saving your changes.',
            type: 'warning',
            timeout: 7000,
            class: 'fadeInOut'
          });
        });
      }
    }
  }
});