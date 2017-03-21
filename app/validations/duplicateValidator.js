import { errorMessages } from './validations-config';
import { validator } from 'ember-cp-validations';

export default function duplicateValidator(existingValues = [], customMessage = null) {
  return validator('exclusion', {
    in: existingValues,
    message: customMessage || errorMessages.duplicateEntry
  });
}
