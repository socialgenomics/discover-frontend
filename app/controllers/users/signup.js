import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';
import { validator } from 'ember-validations';

export default Ember.Controller.extend(
   EmberValidations,
   ServerValidationMixin,
{
  session: Ember.inject.service(),

  validations: {

    fullname: {
      presence: {
        message: 'Can\'t be blank.'
      }
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
  fullname: null,
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  strength: null,
  showPassword: false,
  loading: false,

  type: function() {
    return this.get('showPassword') ? 'text' : 'password';
  }.property('showPassword'),

  setFirstAndLastNamesFromFullName: function() {
    let fullname = this.get('fullname');
    let firstname = fullname.substr(0, fullname.indexOf(' '));
    let lastname = fullname.substr(fullname.indexOf(' ') + 1);
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
    let messages = resp.messages;
    this.addValidationErrors(messages);
    messages = messages.reject(item => {
      return item.type === 'validation';
    });
    if (messages) {
      messages.forEach(message => {
        this.flashMessages.success(message);
      });
    }
    this.set('loading', false);
  },

  actions: {
    submitForm: function() {
      if (this.get('isValid')) {
        let credentials = this.getProperties('firstname', 'lastname', 'email', 'password');
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
          if (resp.messages !== undefined) {
            this.displayMessages(resp.messages);
          }
          // We would like to show a welcome screen if this is the first visit.
          this.get('session').set('data.firstVisit', true);
          // login!
          this.get('session')
          .authenticate('authenticator:repositive', credentials)
          .catch(this.displayMessages);
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
