import Ember from "ember";
import Queue from 'ember-flash-messages/queue';
import EmberValidations from 'ember-validations';


export default Ember.ObjectController.extend(EmberValidations.Mixin, {
  email: '',
  password: '',
  showErrors: true,

  validations: {
    email: {
      server: true,
      presence: true,
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'must be a valid e-mail address'
      },
    },
    password: {
      server: true,
      presence: true,
        length: { minimum: 8 }
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
        _this.transitionToRoute('home');
      }, function(err){
        // messages are already being shown by the authenticator
        // do something else instead?
        console.log(err)
      });
    }
  },
  showMessages : function(messages){
    if (messages) {
      messages.forEach(function(message){
        Queue.pushMessage(message);
      });
    }
  }
});
