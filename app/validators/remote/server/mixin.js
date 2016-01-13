import Ember from 'ember';
import ServerValidator from '../server';


export default Ember.Mixin.create({
  addValidationErrors: function(messages) {
    var serverValidators = {};
    this.validators.forEach(function(validator) {
      if (validator instanceof ServerValidator) {
        serverValidators[validator.property] = validator;
      }
    });
    messages.forEach(message=> {
      if (message.type === 'validation') {
        if (message.field in serverValidators) {
          serverValidators[message.field].set('message', message.message);
        }
      }
    });
  }
});
