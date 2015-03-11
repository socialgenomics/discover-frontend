import Ember from "ember";
import request from 'ic-ajax';

var showMessages = function(resp, emberThing){
   // emberThing is any ember object that flashMessages is
   // initilised to use (see ember flash message docs)
   if ('messages' in resp){
     resp.messages.forEach(function(message){
       emberThing.flashMessage(message.type, message.text);
     });
   }
}

export default Ember.Route.extend({
  model: function(){
    return {
      email:null,
      password:null,
    }
  },
  actions: {
    submitForm: function() {
      var route = this;
      var formData = {
        email: this.currentModel.email,
        password: this.currentModel.password,
      }
      request({
        url:'api/users/signup',
        type:'POST',
        data:formData
      }).then(function(resp){
        // showMessages(resp, route);
        console.log(resp)
      }, function(err){
        // TODO: somthing went badly wrong -- report the err somhow
        console.log(resp)
      });
    }
  }
});
