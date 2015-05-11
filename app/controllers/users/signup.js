import Ember from "ember";
import Queue from 'ember-flash-messages/queue';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive.io/validators/remote/server/mixin';
import ThirdParty from 'repositive.io/mixins/third-party';
import ENV from 'repositive.io/config/environment';


export default Ember.ObjectController.extend(
   EmberValidations.Mixin,
   ServerValidationMixin,
   ThirdParty,
{
  validations:{
    email:{
      presence:true,
      presence:{message:""},
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'Must be a valid e-mail address.'
      },
    },
    password: {
      presence: true,
      presence: {message:""},
      length: { minimum: 8, messages:{tooShort:"Must be at least 8 characters."}},
    },
  },
  email:null,
  password:null,

  actions: {
    submitForm: function() {
      var _this = this;
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
        Queue.pushMessage(message);
      });
    }
  },
});
