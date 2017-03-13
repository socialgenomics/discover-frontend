import { validator, buildValidations } from 'ember-cp-validations';
import { errorMessages } from './validations-config';

export default buildValidations({
  text: validator('presence', {
    presence: true,
    message: errorMessages.blankField
  })
});
