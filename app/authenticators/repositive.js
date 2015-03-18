import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';


export default Base.extend({
  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      resolve(data);
    });
  },
  authenticate: function(data) {
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
            reject(xhr);
        });
      });
    });
  },
  invalidate: function(user) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      // strange but true -- post data should be *username* and password 
      // - due to the way passpost works on the backend. TODO: change this! 
      Ember.$.ajax({
        url: 'api/users/logout',
        type: 'POST',
        data: {
          authToken: user.authToken,
        }
      }).then(function(resp){
        resolve(resp);
      }, function(err){
        reject(err);
      });
    });
  }
});
