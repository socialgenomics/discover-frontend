import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import Queue from 'ember-flash-messages/queue';
import _ from 'npm:underscore';
import ENV from 'repositive.io/config/environment';


export default Base.extend({
  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      // TODO: display any notifications - i.e if you have new messages etc
      resolve(data);
    });
  },
  authenticate: function(data) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        url: ENV.APIRoutes[ENV['simple-auth'].authenticationRoute],
        type: 'POST',
        data: data
      }).then(function(resp){
        resp.user.isCurrentUser = true;

        //ANALYTICS CODE FOR CALQ PROFILE SETUP
        calq.user.identify(resp.user.username);
        calq.user.profile(
            {"$email": resp.user.email }
        );
        // END OF ANALYTICS CODE

        Ember.run(function(){
          // all the properties of the object you resolve with
          // will be added to the session
          resolve(resp);
        });
      }, function(xhr, status, error){
        Ember.run(function(){
          _this.get("loginController").addValidationErrors(xhr.responseJSON.errors);
          reject(xhr);
        });
      });
    });
  },
  invalidate: function(user) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        url: ENV.APIRoutes[ENV['simple-auth'].logoutRoute],
        type: 'POST',
        data: {
          authToken: user.authToken,
        }
      }).then(function(resp){
        _this.showMessages(resp.messages);
        resolve(resp);
      }, function(xhr, status, error){
        _this.showMessages(xhr.responseJSON.messages);
        reject(err);
      });
    });
  },
  showMessages : function(messages){
    if (messages) {
      messages.forEach(function(message){
        Queue.pushMessage(message);
      });
    }
  },
});
