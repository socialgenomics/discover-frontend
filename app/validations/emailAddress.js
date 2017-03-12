import { validator, buildValidations } from 'ember-cp-validations';
import { errorMessages, patterns } from './validations-config';

export default buildValidations({
  emailAddress: [
    validator('presence', {
      presence: true,
      message: errorMessages.blankEmail
    }),
    validator('format', {
      regex: patterns.email,
      message: errorMessages.invalidEmail
    })
  ]
});
