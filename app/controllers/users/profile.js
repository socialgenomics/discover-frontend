import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const { Controller, computed, inject: { service }, get, Logger } = Ember;
const Validations = buildValidations({
  firstname: validator('presence', {
    presence: true,
    message: 'Can\'t be blank.'
  }),
  lastname: validator('presence', {
    presence: true,
    message: 'Can\'t be blank.'
  })
});

export default Controller.extend(
  Validations,
  {
    session: service(),

    firstname: computed.alias('session.authenticatedUser.firstname'),
    lastname: computed.alias('session.authenticatedUser.lastname'),
    affiliation: computed.alias('session.authenticatedUser.userProfile.workOrganisation'),
    isValid: computed.and('firstname', 'lastname'),
    infoHasChanged: computed.or(
      'session.authenticatedUser.currentState.isDirty',
      'session.authenticatedUser.profile.currentState.isDirty'
    ),
    isSavable: computed.and('validations.isValid', 'infoHasChanged'),

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
  }
);
