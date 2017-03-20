import { errorMessages, patterns } from './validations-config';
import { validator } from 'ember-cp-validations';

export default function urlFormatValidator() {
  return validator('format', {
    regex: patterns.url,
    allowBlank: true,
    message: errorMessages.invalidUrl
  });
}
