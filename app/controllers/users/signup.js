import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';
import { validator } from 'ember-validations';
const{ get } = Ember;

export default Ember.Controller.extend(
   EmberValidations,
   ServerValidationMixin,
{
  session: Ember.inject.service(),

  fullname: null,
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  strength: null,
  showPassword: false,
  loading: false,
  formSubmitted: false,

  validations: {

    fullname: {
      presence: {
        message: 'Can\'t be blank.'
      },
      inline: validator(function() {
        let fn = this.get('fullname');
        if (/@/.test(fn)) {
          return 'Please enter your full name.';
        }
      })
    },

    email: {
      presence: {
        message: ''
      },
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'Must be a valid e-mail address.'
      },
      server: true
    },

    password: {
      length: {
        minimum: 8,
        messages: {
          tooShort: 'Must be at least 8 characters long.'
        }
      },
      inline: validator(function() {
        let pw = this.get('password');
        if (!/\d/.test(pw) &&
            !/[A-Z]/.test(pw) &&
            !/[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(pw)) {
          return 'Please enter a number or capital letter.';
        }
      })
    }
  },


  type: function() {
    return this.get('showPassword') ? 'text' : 'password';
  }.property('showPassword'),

  setFirstAndLastNamesFromFullName: function() {
    let fullname = this.get('fullname').split(' ');
    let firstname = fullname.shift();
    let lastname = fullname.shift() || '';
    this.set('firstname', firstname);
    this.set('lastname', lastname);
  }.observes('fullname'),

  buttonDisabled: function() {
    return !this.get('isValid') || this.get('loading');
  }.property('isValid', 'loading'),

  passwordStrength: function() {
    let numErrors = this.get('errors.password.length');

    let pw = this.get('password');
    let specials = [
      /\d/.test(pw),
      /[A-Z]/.test(pw),
      /[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(pw)
    ].reduce((prev, curr)=> {
      return Number(curr) + Number(prev);
    });

    if (numErrors === 0 && (specials > 1)) {
      this.set('strength', 'strong');
    } else if (numErrors <= 1) {
      this.set('strength', 'medium');
    } else {
      this.set('strength', 'weak');
    }
  }.observes('password'),

  displayMessages : function(resp) {
    let messages = get(resp, 'messages');
    if (messages) {
      this.addValidationErrors(messages);
      messages = messages.reject(item => {
        return item.type === 'validation';
      });
      this.set('loading', false);
    }
  },

  actions: {
    signupAndAuthenticate: function() {
      if (this.get('isValid')) {
        this.set('formSubmitted', true);
        let credentials = this.getProperties('firstname', 'lastname', 'main_email', 'password');
        this.set('loading', true);
        /*
          Signup with repositive.
         */
        ajax({
          url: ENV.APIRoutes[ENV['ember-simple-auth'].signupRoute],
          type: 'POST',
          data: credentials
        })
        .then((resp)=> { // signup has suceeded, now login
          // render any messages provided by the backend
          if ('messages' in resp) {
            this.displayMessages(resp);
          }
          // login!
          this.get('session').authenticate('authenticator:repositive', credentials)
          .then(() => this.get('session').set('data.firstVisit', true))
          .then(() => this.get('session').set('data.displayWelcomeMessage', false))
          .catch(this.displayMessages.bind(this));
        })
        .catch(err => { // error with signup
          if (err.jqXHR !== undefined) {
            /*
              if the error is 4XX or 5XX server resp display the error messages.
             */
            this.displayMessages(err.jqXHR.responseJSON);
          } else {
            throw err;
          }
        });
      }
    },

    toggleCheckbox: function() {
      this.set('showPassword', !this.get('showPassword'));
    }
  }
});
