import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';


export default Base.extend({
  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      // TODO: display any notifications - i.e if you have new messages etc
      resolve(data);
    });
  },
  authenticate: function(data) {
    if ('provider' in data){
      // this is a third party login
      return ajax({
        url: ENV.APIRoutes['users.signup'],
        type: 'POST',
        data: data
      })
      .then((resp)=>{
        return this._resolveWithResp(resp);
      });
    }
    else {
      return ajax({
        url: ENV.APIRoutes[ENV['simple-auth'].authenticationRoute],
        type: 'POST',
        data: data
      })
      .then((resp)=>{
        return this._resolveWithResp(resp);
      })
      .error((err)=>{
        this.get("loginController").addValidationErrors(err.jqXHR.responseJSON.errors);
        return Ember.RSVP.reject(err);
      });
    }
  },
  invalidate: function(user) {
    return ajax({
      url: ENV.APIRoutes[ENV['simple-auth'].logoutRoute],
      type: 'POST',
      data: {
        authToken: user.authToken,
      }
    })
    .then((resp)=>{
      //_this.showMessages(resp.messages);
      return Ember.RSVP.resolve(resp);
    })
    .error((xhr, status, err)=>{
        //_this.showMessages(xhr.responseJSON.messages);
        return Ember.RSVP.reject(err);
    });
  },
  _resolveWithResp: function(resp){
    return new Ember.RSVP.Promise((resolve)=>{

      resp.user.isCurrentUser = true;

      //ANALYTICS CODE FOR CALQ PROFILE SETUP
      calq.user.identify(resp.user.username);
      calq.user.profile({
        "$email": resp.user.email,
        "InviteCode": this.get('loginController.controllers.application.code')
      });
      // END OF ANALYTICS CODE

      Ember.run(function(){
        // all the properties of the object you resolve with
        // will be added to the session
        resolve(resp);
      });
    });
  },
  showMessages : function(messages){
    if (messages) {
      messages.forEach(function(message){
        console.log(message);
      });
    }
  },
});
