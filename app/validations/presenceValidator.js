import { errorMessages } from './validations-config';
import { validator } from 'ember-cp-validations';

export default function presenceValidator(customMessage = null) {
  return validator('presence', {
    presence: true,
    message: customMessage || errorMessages.blankField
  });
}
