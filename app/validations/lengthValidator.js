import { errorMessages } from './validations-config';
import { validator } from 'ember-cp-validations';

export default function emailFormatValidator(length) {
  return validator('length', {
    min: length,
    message: errorMessages.minLength.replace('$1', length)
  });
}
