import Ember from "ember";
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';

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
  firstname:null,
  lastname:null,
  email:null,
  password:null,
  strength:null,
  showPassword:false,
  formSubmitted: false,

  setFirstAndLastNamesFromFullName:function(){
    var firstname = this.get('fullname').split(' ')[0];
    var lastname = this.get('fullname').split(' ')[1];
    this.set('firstname', firstname);
    this.set('lastname', lastname);
  }.observes('fullname'),

  actions: {
    submitForm: function() {
      var _this = this;
      this.set('formSubmitted', true);
      if (this.get('isValid')){
        var credentials = this.getProperties('firstname', 'lastname', 'email', 'password');
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
    toggleCheckbox: function() {
      this.set('showPassword', !this.get('showPassword'));
    }
  },

  togglePassword: function() {
    var text = this.get('password');
    var pw = this.get('password');

    if (this.get('showPassword') === true) {
      text.toString();
      this.set('password', text);
    }
    else {
      this.set('password', pw);
    }
  }.observes('showPassword', 'password'),

  passwordStrength: function() {
    var pass = this.get('password.length');

    if (pass < 6) {
      this.set('strength', "weak");
    }
    else if (pass < 12) {
      this.set('strength', "medium");
    }
    else {
      this.set('strength', "strong");
    }
  }.observes('password'),

  showMessages : function(messages){
    if (messages) {
      messages.forEach(function(message){
        this.flashMessages.success(message);
      }.bind(this));
    }
  },
});
