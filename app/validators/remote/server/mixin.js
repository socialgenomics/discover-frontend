import Ember from 'ember';


export default Ember.Mixin.create({
  addValidationErrors: function(errors){
    var serverValidators = {};
    this.validators.forEach(function(validator){
      // es6 module transpiler screws this up
      //if(validator instanceof ServerValidation.constructor){
      // bloddy hack
        if (validator.toString().search(/repositive.io@validator:remote\/server::/)){
        serverValidators[validator.property] = validator;
      }
    });
    for (var key in errors){
      if (key in serverValidators){
        serverValidators[key].set('message', errors[key]);
      }
    }
  }
});
