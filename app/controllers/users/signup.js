import Ember from 'ember';
import EmberValidations from 'ember-validations';
 
export default Ember.Controller.extend(EmberValidations.Mixin, {
  errors: [],
 
  validations: {
    email: {
      presence: true,
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
       message: 'must be a valid e-mail address'
      }
    },
    password: {
      presence: true,
       length: { minimum: 8 }
    },
    passwordConfirmation: true
  }
});
