import { validator, buildValidations } from 'ember-cp-validations';
import { errorMessages, patterns } from './validations-config';

export default buildValidations({
  title: validator('presence', {
    presence: true,
    message: errorMessages.blankField
  }),
  description: validator('presence', {
    presence: true,
    message: errorMessages.blankField
  }),
  url: validator('format', {
    regex: patterns.url,
    allowBlank: true,
    message: errorMessages.invalidUrl
  })
});
