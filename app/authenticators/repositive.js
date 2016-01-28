import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';


export default Base.extend({
  metrics: Ember.inject.service(),
  session: Ember.inject.service(),

  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // TODO: display any notifications - i.e if you have new messages etc
      resolve(data);
    });
  },

  authenticate: function(data) {
    if ('provider' in data) {
      // this is a third party login
      return ajax({
        url: ENV.APIRoutes['users.signup'],
        type: 'POST',
        data: data
      })
      .then((resp)=> {
        return this._resolveWithResp(resp);
      })
      .catch(this._handleError);
    } else {
      return ajax({
        url: ENV.APIRoutes[ENV['ember-simple-auth'].authenticationRoute],
        type: 'POST',
        data: data
      })
      .then(resp=> {
        return this._resolveWithResp(resp);
      })
      .catch(this._handleError);
    }
  },

  invalidate: function(user) {
    return ajax({
      url: ENV.APIRoutes[ENV['ember-simple-auth'].logoutRoute],
      type: 'POST',
      data: {
        authToken: user.authToken
      }
    })
    .then((resp)=> {
      return Ember.RSVP.resolve(resp);
    })
    .catch(this._handleError);
  },

  _resolveWithResp: function(resp) {
    return new Ember.RSVP.Promise((resolve)=> {
      try {
        this.get('metrics').identify({
          email: resp.user.email,
          inviteCode: this.get('session').set('data.inviteCode'),
          firstname: resp.user.firstname,
          lastname: resp.user.lastname,
          username: resp.user.username
        });
      } catch (err) {
        console.error('Error on metrics.identify', err);
      }
      /*
        Use ember run to avoid pain.
       */
      Ember.run(function() {
        // all the properties of the object you resolve with
        // will be added to the session
        resolve(resp);
      });
    });
  },
  showMessages: function (messages) {
    if (messages) {
      messages.forEach(function (message) {
        console.log(message);
      });
    }
  }
});
