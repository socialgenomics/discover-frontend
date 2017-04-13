import { errorMessages } from './validations-config';
import { validator } from 'ember-cp-validations';

export default function confirmationValidator(password) {
  return validator('confirmation', {
    on: password,
    message: errorMessages.confirmPassword
  });
}
