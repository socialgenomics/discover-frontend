import { errorMessages } from './validations-config';
import { validator } from 'ember-cp-validations';

export default function emptyValidator(customMessage = null) {
  return validator('presence', {
    presence: true,
    ignoreBlank: true,
    message: customMessage || errorMessages.emptyField
  });
}
