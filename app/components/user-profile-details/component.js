import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import presenceValidator from 'repositive/validations/presenceValidator';
import lengthValidator from 'repositive/validations/lengthValidator';
import { lengths, lengthTypes } from 'repositive/validations/validations-config';

const { Component, get, set } = Ember;
const Validations = buildValidations({
  'user.profile.bio': [
    presenceValidator(),
    lengthValidator(lengths.description, lengthTypes.max)
  ],
  'user.firstname': [
    presenceValidator(),
    lengthValidator(lengths.textFieldShort, lengthTypes.max)
  ],
  'user.lastname': [
    presenceValidator(),
    lengthValidator(lengths.textFieldShort, lengthTypes.max)
  ],
  'user.profile.affiliation': lengthValidator(lengths.textFieldLong, lengthTypes.max),
  'user.profile.jobTitle': lengthValidator(lengths.textFieldLong, lengthTypes.max),
  'user.profile.Location': lengthValidator(lengths.textFieldLong, lengthTypes.max)
});

export default Component.extend(Validations, {
  tagName: 'form',

  init() {
    this._super(...arguments);

    set(this, 'userAttributes', [
      {
        label: 'Short Bio (max 250 characters)',
        multiline: true,
        placeholder: 'Tell us a bit more what are you working on.',
        value: get(this, 'user.profile.bio')
      },
      {
        label: 'First Name',
        placeholder: 'e.g. Christina',
        value: get(this, 'user.firstname')
      },
      {
        label: 'Last Name',
        placeholder: 'e.g. Luckasson',
        value: get(this, 'user.lastname')
      },
      {
        label: 'Affiliation',
        placeholder: 'e.g. Bioinformatician at XYZ Institute',
        value: get(this, 'user.userProfile.workOrganisation')
      },
      {
        label: 'Job Role',
        placeholder: 'e.g. Postdoctoral Researcher',
        value: get(this, 'user.userProfile.workRole')
      },
      {
        label: 'Location',
        placeholder: 'e.g. Cambridge, UK',
        // value: get(this, 'user.location')
        value: ''
      }
    ]);
  }
});
