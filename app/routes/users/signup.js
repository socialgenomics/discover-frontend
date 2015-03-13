import Ember from "ember";
import { raw } from 'ic-ajax';
import User from 'repositive.io/models/user';

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
      var formData = {
        username: this.currentModel.email,
        password: this.currentModel.password,
      };
      // use the raw method to anable access to the http headers
      raw({
        url:'api/users',
        type:'POST',
        data:formData
      }).then(function(resp){
        // signup sucessful, add the current user to the store.
        var body = resp.response;
        body.isCurrentUser = true;
        route.store.push('user',body);
        // transition to homepage
        showMessages(body, route);
        route.transitionTo('home');
        var cookie = resp.jqXHR.getResponseHeader('set-cookie');
        alert(cookie)
      }, function(err){
        showMessages(err, route);
      });
    }
  }
});
