import Ember from "ember";
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';
import { validator } from 'ember-validations';

export default Ember.ObjectController.extend(
   EmberValidations,
   ServerValidationMixin,
{
  needs: ['root'],

  validations:{

    fullname:{
      presence: {
        message: "Can't be blank."
      },
    },

    email:{
      presence: {
        message: "Can't be blank."
      },
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'Must be a valid e-mail address.'
      },
      server: true,
    },

    password: {
      length: {
        minimum: 8,
        messages: {
          tooShort:"Must be at least 8 characters long."
        }
      },
      inline: validator(function() {
        let pw = this.get('password');
        if (!/\d/.test(pw) &&
            !/[A-Z]/.test(pw) &&
            !/[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(pw)) {
          return "Please enter a number or capital letter."
        }
      }),
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
    let fullname = this.get('fullname');
    let firstname = fullname.substr(0,fullname.indexOf(' '));
    let lastname = fullname.substr(fullname.indexOf(' ')+1);
    this.set('firstname', firstname);
    this.set('lastname', lastname);
  }.observes('fullname'),

  passwordStrength: function() {
    let numErrors = this.get('errors.password.length');

    let pw = this.get('password');
    let specials = [
      /\d/.test(pw),
      /[A-Z]/.test(pw),
      /[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(pw),
    ].reduce((prev, curr)=>{
      return Number(curr) + Number(prev);
    });

    if (numErrors === 0 && (specials > 1)){
      this.set('strength', "strong");
    }
    else if (numErrors <= 1){
      this.set('strength', "medium");
    }
    else{
      this.set('strength', "weak")
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
            // render any messages provided by the backend
            this.showMessages(resp.messages);
            // We would like to show a welcome screen if this is the first visit.
            this.get('controllers.root').set('firstVisit', true);
            // login!
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