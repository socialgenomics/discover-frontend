import { errorMessages } from './validations-config';
import { validator } from 'ember-cp-validations';

export default function lengthValidator(length, type) {
  return validator('length', {
    [type]: length,
    message: errorMessages[`${type}Length`].replace('$1', length)
  });
}
