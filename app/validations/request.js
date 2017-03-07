import { validator, buildValidations } from 'ember-cp-validations';
import { errorMessages } from './validations-config';

export default buildValidations({
  title: validator('presence', {
    presence: true,
    message: errorMessages.blankField
  }),
  description: validator('presence', {
    presence: true,
    message: errorMessages.blankField
  })
});
