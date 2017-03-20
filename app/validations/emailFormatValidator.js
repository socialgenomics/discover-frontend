import { errorMessages, patterns } from './validations-config';
import { validator } from 'ember-cp-validations';

export default function emailFormatValidator() {
  return validator('format', {
    regex: patterns.email,
    message: errorMessages.invalidEmail
  });
}
