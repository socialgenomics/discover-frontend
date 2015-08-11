import Ember from "ember";
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';

export default Ember.ObjectController.extend(
   EmberValidations,
   ServerValidationMixin,
{
  validations:{
    email:{
      presence: {
        message: ""
      },
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'Must be a valid e-mail address.'
      },
      server: true,
    },
    password: {
      presence: {
        message: ""
      },
      length: { minimum: 8, messages:{tooShort:"Must be at least 8 characters."}},
      server: true,
    },
  },
  email:null,
  password:null,
  formSubmitted: false,
  actions: {
    submitForm: function() {
      var _this = this;
      this.set('formSubmitted', true);
      if (this.get('isValid')){
        var credentials = this.getProperties('email', 'password');
        Ember.$.ajax({
          url: ENV.APIRoutes[ENV['simple-auth'].signupRoute],
          type: 'POST',
          data: credentials
        }).then(function(resp){ // signup has suceeded, now login
          _this.showMessages(resp.messages);
          _this.get('session').authenticate('authenticator:repositive', credentials);
        }, function(xhr, status, error){
          //_this.showMessages(xhr.responseJSON.messages);
          _this.addValidationErrors(xhr.responseJSON.errors);
        });
      } else {
        console.log('invalid');
      }
    },
  },

  showMessages : function(messages){
    if (messages) {
      messages.forEach(function(message){
        this.flashMessages.success(message);
      }.bind(this));
    }
  },
});
