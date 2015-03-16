import Ember from "ember";
import ajax from 'ic-ajax';

var showMessages = function(resp, emberThing){
   // emberThing is any ember object that flashMessages is
   // initilised to use (see ember flash message docs)
   if ('messages' in resp){
     resp.messages.forEach(function(message){
       emberThing.flashMessage(message.type, message.text);
     });
   }
};

export default Ember.Route.extend({
  model: function(){
    return {
      email:null,
      password:null,
    };
  },
  actions: {
    submitForm: function() {
      var route = this;
      // strange but true -- post data should be *username* and password 
      // - due to the way passpost works on the backend. TODO: change this! 
      ajax({
        url:'api/users',
        type:'POST',
        data:{
          username: this.currentModel.email,
          password: this.currentModel.password,
        }
      }).then(function(resp){
        showMessages(resp, route);
        route.transitionTo('users.profile');
      }, function(err){
        showMessages(err, route);
      });
    }
  }
});
