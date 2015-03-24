import Ember from "ember";
import ajax from 'ic-ajax';
import Queue from 'ember-flash-messages/queue';
import EmberValidations from 'ember-validations';


export default Ember.ObjectController.extend(EmberValidations.Mixin, {
  email:null,
  password:null,
  showErrors:false,

  validations: {
    email: {
      presence: true,
      format: {
        with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
        message: 'must be a valid e-mail address'
      }
    },
    password: {
      presence: true,
        length: { minimum: 8 }
    },
  },
  actions: {
    submitForm: function() {
      var _this = this;
      if (this.get('isValid')){
        ajax({
          url:'api/users',
          type:'POST',
          data:{
            email: this.email,
            password: this.password,
          }
        }).then(function(resp){
          _this.showMessages(resp.messages);
          _this.get('session').authenticate('authenticator:repositive', {
            email: _this.email,
            password: _this.password,
          });
        }, function(err){
          _this.showMessages(xhr.responseJSON.messages);
        });
      } else {
        this.set('showErrors', true);
      }
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
