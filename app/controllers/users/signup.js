import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';
import { validator } from 'ember-validations';
const{ get, computed } = Ember;

export default Ember.Controller.extend(
   EmberValidations,
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
  isDisabled: computed('loading', 'isValid', function() {
    return this.get('loading') || !this.get('isValid');
  }),

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

  displayMessage(resp) {
    const errorCode = get(resp, 'status_code');
    let message;
    if (errorCode === 400) { //Bad Request
      message = 'Error: Invalid email or an account already exists with this email.';
    } else {
      message = get(resp, 'message');
    }
    if (message) {
      this.flashMessages.add({
        message: message,
        type: 'warning',
        timeout: 7000,
        class: 'fadeIn'
      });
    }
  },

  actions: {
    signupAndAuthenticate: function() {
      if (!this.get('isDisabled')) {
        this.set('formSubmitted', true);
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
          this.get('session').authenticate('authenticator:repositive', credentials)
          .then(() => this.get('session').set('data.firstVisit', true))
          .then(() => {
            this.get('session').set('data.displayWelcomeMessage', false);
            this.set('loading', false);
          })
          .catch(this.displayMessage.bind(this));
        })
        .catch(err => { // error with signup
          this.set('loading', false);
          if (err.jqXHR !== undefined) {
            /*
              if the error is 4XX or 5XX server resp display the error messages.
             */
            this.displayMessage(err.jqXHR.responseJSON);
          } else {
            throw err;
          }
        });
      }
    },

    toggleCheckbox: function() {
      this.toggleProperty('showPassword');
    }
  }
});
