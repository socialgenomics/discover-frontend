import Ember from "ember";
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';


export default Ember.ObjectController.extend(
  EmberValidations,
  ServerValidationMixin,
{
  email:null,
  loading:false,
  messages:[],

  buttonDisabled: function(){
    return !this.get('isValid') || this.get('loading');
  }.property('isValid', 'loading'),

  clearMessages: function(){
    this.set("messages", [])
  }.observes('email'),

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
  },
  actions: {
    submitForm: function() {
      this.set('loading', true);
      ajax({
        url: ENV.APIRoutes['reset-password'] + '/' + this.get("email"),
        type:'GET',
      })
      .then(resp=>{
        this.get("messages").addObjects(resp.messages)
      })
      .catch(err=>{
        this.get("messages").addObjects(err.jqXHR.responseJSON.messages)
      })
    }
  }
});
