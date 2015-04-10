import Ember from "ember";
import Queue from 'ember-flash-messages/queue';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive.io/validators/remote/server/mixin';
import ThirdParty from 'repositive.io/mixins/third-party'


export default Ember.ObjectController.extend(
    EmberValidations.Mixin,
    ServerValidationMixin,
    ThirdParty,
{
  email:null,
  password:null,
  showErrors:true,

  validations: {
    email: {
      presence: true,
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'must be a valid e-mail address'
      },
      // must go last - somthing todo with observables being syncronous
      server: true,
    },
    password: {
      presence: true,
      length: { minimum: 8 },
      server: true,
    },
  },
  actions: {
    submitForm: function() {
      var _this = this;
      if (this.get('isValid')){
        var credentials = this.getProperties('email', 'password');
        Ember.$.ajax({
          url: 'api/users',
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
        this.set('showErrors', true);
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
