import Ember from "ember";

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
      this.get('session')
        .authenticate('authenticator:repositive', 
          {
            email: this.currentModel.email,
            password: this.currentModel.password
          }
      ).then(function(resp){
        showMessages(body, route);
        route.transitionTo('home');
      }, function(err){
        showMessages(err, route);
      });
    }
  }
});
