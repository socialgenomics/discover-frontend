import Ember from "ember";
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';


export default Ember.ObjectController.extend(
  EmberValidations,
  ServerValidationMixin,
{
  email:null,
  password:null,
  loading: false,
  formSubmitted: false,
  buttonDisabled: function(){
    return !this.get('isValid') || this.get('loading');
  }.property('isValid', 'loading'),

  validations:{
    email:{
      presence:{
        message: " "
      },
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'Must be a valid e-mail address'
      },
      server: true, // must be last - unknown bug
    },
    password: {
      presence: {
        message: " "
      },
      length: { minimum: 8, messages:{ tooShort: "Must be at least 8 characters."}},
      server: true, // must be last - unknown bug
    },
  },
  actions: {
    submitForm: function() {
      var _this = this;
      this.set('loading', true);
      this.set('formSubmitted', true)
      this.get('session')
      .authenticate('authenticator:repositive', {
        email: this.email,
        password: this.password
      })
      .then(function(resp){
        _this.set('loading', false);
      },
      function(error){
        //_this.addValidationErrors(xhr.responseJSON.errors);
        _this.set('loading', false);
      });
    }
  }
});
