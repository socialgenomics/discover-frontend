import Ember from 'ember';
import EmberValidations from 'ember-validations';

const { Controller, computed, inject: { service }, get, Logger } = Ember;

export default Controller.extend(
  EmberValidations,
{
  session: service(),

  firstname: computed.alias('session.authenticatedUser.firstname'),
  lastname: computed.alias('session.authenticatedUser.lastname'),
  affiliation: computed.alias('session.authenticatedUser.userProfile.workOrganisation'),
  isValid: computed.and(
    'firstname',
    'lastname'
  ),
  infoHasChanged: computed.or(
    'session.authenticatedUser.currentState.isDirty',
    'session.authenticatedUser.profile.currentState.isDirty'
  ),

  isSavable: computed('isValid', 'infoHasChanged', function() {
    const isValid = get(this, 'isValid');
    const infoHasChanged = get(this, 'infoHasChanged');
    if (isValid && infoHasChanged) {
      return true;
    }
    return false;
  }),

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

  actions: {
    save() {
      const user = this.get('session.authenticatedUser');
      if (get(this, 'isSavable')) {
        return user.save()
        .then(resp => {
          return resp.profile.save();
        })
        .then(() => {
          this.flashMessages.add({
            message: 'Your profile has been updated.',
            type: 'success'
          });
        })
        .catch(err => {
          Logger.error(err);
          this.flashMessages.add({
            message: 'Sorry. There was a problem saving your changes.',
            type: 'warning'
          });
        });
      }
    }
  }
});
