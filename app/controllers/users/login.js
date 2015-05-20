import Ember from "ember";
import EmberValidations from 'ember-validations';
import ThirdPartyMixin from 'repositive.io/mixins/third-party'
import ServerValidationMixin from 'repositive.io/validators/remote/server/mixin';


export default Ember.ObjectController.extend(
  EmberValidations.Mixin,
  ServerValidationMixin,
  ThirdPartyMixin,
{
  validations:{
    email:{
      presence:true,
      presence:{message:" "},
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'Must be a valid e-mail address'
      },
      server: true, // must be last - unknown bug
    },
    password: {
      presence: true,
      presence: {message:" "},
      length: { minimum: 8, messages:{tooShort:"Must be at least 8 characters."}},
      server: true, // must be last - unknown bug
    },
  },
  email:null,
  password:null,
  actions: {
    submitForm: function() {
      var _this = this;
      this.get('session')
      .authenticate('authenticator:repositive',
        {
          email: this.email,
          password: this.password
        }
      ).then(function(resp){
        //_this.transitionToRoute('root');
      }, function(err){
        // messages are already being shown by the authenticator
        // do something else instead?
        console.log(err);
      });
    }
  },
});
