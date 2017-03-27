import { errorMessages, patterns } from './validations-config';
import { validator } from 'ember-cp-validations';

export default function passwordFormatValidator() {
  return validator('format', {
    regex: patterns.password,
    message: errorMessages.invalidPassword
  });
}
