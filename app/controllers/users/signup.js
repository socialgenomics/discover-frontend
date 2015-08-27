import Ember from "ember";
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';

export default Ember.ObjectController.extend(
   EmberValidations,
   ServerValidationMixin,
{
  validations:{

    fullname:{
      presence: {
        message: "Can't be blank."
      },
      server: true,
    },
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
  fullname:null,
  email:null,
  password:null,
  formSubmitted: false,
  actions: {
    submitForm: function() {
      var _this = this;
      this.set('formSubmitted', true);
      if (this.get('isValid')){
        var credentials = this.getProperties('fullname', 'email', 'password');
        ajax({
          url: ENV.APIRoutes[ENV['simple-auth'].signupRoute],
          type: 'POST',
          data: credentials
        })
        .then((resp)=>{ // signup has suceeded, now login
            this.showMessages(resp.messages);
            this.get('session').authenticate('authenticator:repositive', credentials);
        })
        .catch((err)=>{
            //_this.showMessages(xhr.responseJSON.messages);
            this.addValidationErrors(err.jqXHR.responseJSON.errors);
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
