import Ember from 'ember';
import ServerValidator from '../server';


export default Ember.Mixin.create({
  addValidationErrors: function(errors) {
    var serverValidators = {};
    this.validators.forEach(function(validator) {
      // es6 module transpiler screws this up
      if (validator instanceof ServerValidator) {
        // bloddy hack
        //  if (validator.toString().search(/repositive@validator:remote\/server::/)){
        serverValidators[validator.property] = validator;
      }
    });
    for (var key in errors) {
      if (key in serverValidators) {
        serverValidators[key].set('message', errors[key]);
      }
    }
  }
});
