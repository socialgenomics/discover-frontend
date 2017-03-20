import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';

const { Controller, computed, inject: { service }, get, Logger } = Ember;
const Validations = buildValidations({
  firstname: presenceValidator(),
  lastname: presenceValidator()
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
