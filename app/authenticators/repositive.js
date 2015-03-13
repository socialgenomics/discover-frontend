import Base from 'simple-auth/authenticators/base';
import ajax from 'ic-ajax';
import Ember from 'ember';

export default Base.extend({
  restore: function(data) {
    return data;
  },
  authenticate: function(email, password) {
    var that = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      ajax({
        url: 'api/users/login',
        type: 'POST',
        data: {
          email:email,
          password:password,
        }
      }).then(function(resp){
        var body = resp.response;
        body.isCurrentUser = true;
        that.store.push('user',body);
        resolve(resp);
      }, function(err){
        reject(err);
      });
    });
  },
  invalidate: function(user) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      // strange but true -- post data should be *username* and password 
      // - due to the way passpost works on the backend. TODO: change this! 
      ajax({
        url: 'api/users/logout',
        type: 'POST',
        data: {
          authToken: user.authToken,
        }
      }).then(function(resp){
        console.log(resp);
        resolve(true);
      }, function(err){
        reject(err);
      });
    });
  }
});
