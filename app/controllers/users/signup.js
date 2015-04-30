import Ember from "ember";
import Queue from 'ember-flash-messages/queue';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive.io/validators/remote/server/mixin';
import ThirdParty from 'repositive.io/mixins/third-party'
import ENV from 'repositive.io/config/environment';


export default Ember.ObjectController.extend(
//    EmberValidations.Mixin,
//    ServerValidationMixin,
//    ThirdParty,
{
  email:null,
  password:null,
  showErrors:true,

  emailValid: false,
  passwordValid: false,

  isValid: function(){
    return this.get("emailValid") && this.get("passwordValid");
  }.property('emailValid', 'passwordValid'),

  actions: {
    submitForm: function() {
      var _this = this;
      console.log(this.get('isValid'))
      console.log(this.getProperties('email'));
      console.log(this.getProperties('password'));
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
        console.log('invalid')
        this.set('showErrors', true);
      }
    },
    emailValidHasChanged:function(value){
      // console.log(value)
      this.set('emailValid', value);
      // console.log(this.get('emailValid'))
    },

    passwordValidHasChanged:function(value){
      this.set('passwordValid', value);
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
