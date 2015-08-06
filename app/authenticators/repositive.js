import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import Queue from 'ember-flash-messages/queue';
import _ from 'npm:underscore';
import ajax from 'ic-ajax';
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
    if ('provider' in data){
      // this is a third party login
      return ajax({
        url: ENV.APIRoutes['users.signup'],
        type: 'POST',
        data: data
      })
      .then(function(resp){
        return _this._resolveWithResp(resp);
      });
    }
    else {
      return ajax({
        url: ENV.APIRoutes[ENV['simple-auth'].authenticationRoute],
        type: 'POST',
        data: data
      })
      .then(function(resp){
        return _this._resolveWithResp(resp);
      })
      .fail(function(err){
        Ember.run(function(){
          _this.get("loginController").addValidationErrors(err.jqXHR.responseJSON.errors);
          Ember.RSVP.reject(xhr);
        });
      });
    }
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
        //_this.showMessages(resp.messages);
        resolve(resp);
      }, function(xhr, status, error){
        //_this.showMessages(xhr.responseJSON.messages);
        reject(err);
      });
    });
  },
  _resolveWithResp: function(resp){
    return new Ember.RSVP.Promise(function(resolve, reject){
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
    })
  },
  showMessages : function(messages){
    if (messages) {
      messages.forEach(function(message){
        Queue.pushMessage(message);
      });
    }
  },
});
