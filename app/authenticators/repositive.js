import Ember from 'ember';

import Base from 'simple-auth/authenticators/base';
import Queue from 'ember-flash-messages/queue';
import _ from 'npm:underscore';


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
        url: 'api/users/login',
        type: 'POST',
        data: data
      }).then(function(resp){
        resp.isCurrentUser = true;
        Ember.run(function(){
          // all the properties of the object you resolve with
          // will be added to the session
          resolve({userData: resp});
        });
      }, function(xhr, status, error){
        Ember.run(function(){
          _this.showMessages(xhr.responseJSON.messages);
          reject(xhr);
        });
      });
    });
  },
  invalidate: function(user) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        url: 'api/users/logout',
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
  }
});
