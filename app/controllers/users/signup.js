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
      length: { minimum: 8, messages:{tooShort:" "}},
      format: {
        with: /(?=.*\d)(?=.*[A-Z])/,
        //allowBlank: true,
        message: "Strong password has minimum 8 characters, an uppercase and a number."
      },
      server: true,
    },
  },
  fullname:null,
  firstname:null,
  lastname:null,
  email:null,
  password:null,
  strength:null,
  showPassword:false,
  formSubmitted: false,

  type: function() {
    return this.get('showPassword') ? 'text' : 'password';
  }.property('showPassword'),

  setFirstAndLastNamesFromFullName:function(){
    var firstname = this.get('fullname').split(' ')[0];
    var lastname = this.get('fullname').split(' ')[1];
    this.set('firstname', firstname);
    this.set('lastname', lastname);
  }.observes('fullname'),

  passwordStrength: function() {
    var accept = this.get('errors.password.length');

    if (accept < 1) {
      this.set('strength', " strong");
    }
    else if (accept === 1) {
      this.set('strength', " medium");
    }
    else {
      this.set('strength', " weak");
    }
  }.observes('password'),

  showMessages : function(messages){
    if (messages) {
      messages.forEach(function(message){
        this.flashMessages.success(message);
      }.bind(this));
    }
  },

  actions: {
    submitForm: function() {
      var _this = this;
      this.set('formSubmitted', true);
      if (this.get('isValid')){
        var credentials = this.getProperties('firstname', 'lastname', 'email', 'password');
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
    toggleCheckbox: function() {
      this.set('showPassword', !this.get('showPassword'));
    }
  },
});
