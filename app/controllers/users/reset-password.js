import Ember from "ember";
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';


export default Ember.ObjectController.extend(
  EmberValidations,
  ServerValidationMixin,
{
  resetKey:null,
  password1:null,
  password2:null,
  loading:false,
  messages:[],
  resendEmailMessage:false,

  buttonDisabled: function(){
    return !this.get('isValid') || this.get('loading');
  }.property('isValid', 'loading'),

  clearMessages: function(){
    this.set("messages", [])
  }.observes('password1', 'password2'),

  validations:{
    password1: {
      presence: {
        message: " "
      },
      length: { minimum: 8, messages:{ tooShort: "Must be at least 8 characters."}},
      server: true, // must be last - unknown bug
    },
    password2: {
      presence: {
        message: " "
      },
      length: { minimum: 8, messages:{ tooShort: "Must be at least 8 characters."}},
      server: true, // must be last - unknown bug
    },
  },
  actions: {
    submitForm: function() {
      this.set('loading', true);
      if (this.get("password1") !== this.get("password2")){
        this.get("messages").addObject({
          type:"warning",
          text:"Passwords do not match"
        })
      }
      else{
        ajax({
          url: ENV.APIRoutes['reset-password'],
          type:'POST',
          data: {
            token: this.get("resetKey"),
            password: this.get("password1"),
          }
        })
        .then(resp=>{
          this.get("messages").addObjects(resp.messages)
        })
        .catch(err=>{
          // TODO: remove this
          this.set("resendEmailMessage", true);
          //TODO write a helper to render messages
          //this.get("messages").addObjects(err.jqXHR.responseJSON.messages)
        })
      }
    }
  }
});
