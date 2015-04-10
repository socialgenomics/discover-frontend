import Ember from "ember";
import Queue from 'ember-flash-messages/queue';
import EmberValidations from 'ember-validations';
import ThirdParty from 'repositive.io/mixins/third-party'
import ServerValidationMixin from 'repositive.io/validators/remote/server/mixin';


export default Ember.ObjectController.extend(
    EmberValidations.Mixin,
    ServerValidationMixin,
    ThirdParty,
{
  email: '',
  password: '',
  showErrors: true,

  validations: {
    email: {
      presence: true,
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'must be a valid e-mail address'
      },
      server: true,
    },
    password: {
      presence: true,
      length: { minimum: 8 },
      server: true,
    },
  },
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
        console.log(err)
      });
    }
  },
});
