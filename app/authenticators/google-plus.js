import Base from 'simple-auth/authenticators/base';

var GooglePlusAuthenticator = Base.extend({
  restore: function(properties) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(properties.access_token)) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },
  authenticate: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      gapi.auth.authorize({
        client_id:        '694766332436-1g5bakjoo5flkfpv3t2mfsch9ghg7ggd.apps.googleusercontent.com',
        scope:            ['https://www.googleapis.com/auth/plus.me'],
        'approvalprompt': 'force',
        immediate:        false
      }, function(authResult) {
        if (authResult && !authResult.error) {
            resolve({ access_token: authResult.access_token });
          } else {
            reject((authResult || {}).error);
          }
      });
    });
  },
  invalidate: function() {
    return Ember.RSVP.resolve();
  }
});

export default GooglePlusAuthenticator;
