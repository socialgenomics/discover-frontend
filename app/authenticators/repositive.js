import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export function handleError(ctx) {
  return function(err) {
    if (err.jqXHR !== undefined) {
      /*
        if the error is 4XX or 5XX server resp return it.
      */
      ctx.get('metrics').trackEvent({
        category: 'auth',
        action: 'login',
        label: 'Failed'
      });
      return Ember.RSVP.reject(err.jqXHR.responseJSON);
    } else {
      throw err;
    }
  };
}

export function resolveWithResp(ctx) {
  return function(resp) {
    ctx.get('metrics').trackEvent({
      category: 'auth',
      action: 'login',
      label: 'Success'
    });
    return resp;
  };
}

export function invalidate(ctx) {
  return function(user) {
    return ajax({
      url: ENV.APIRoutes[ENV['ember-simple-auth'].logoutRoute],
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        token: user.token
      })
    })
    .catch(handleError(ctx));
  };
}

export default Base.extend({
  metrics: Ember.inject.service(),
  session: Ember.inject.service(),
  restore: function(data) {
    return new Ember.RSVP.Promise(resolve => {
      // TODO: display any notifications - i.e if you have new messages etc
      resolve(data);
    });
  },

  authenticate: function(data) {
    if ('provider' in data) {
      // this is a third party login
      return ajax({
        url: ENV.APIRoutes['users.login'],
        type: 'POST',
        contentType: 'application/json',
        data: data
      })
      .then(resolveWithResp(this))
      .catch(handleError(this));
    } else {
      return ajax({
        url: ENV.APIRoutes[ENV['ember-simple-auth'].authenticationRoute],
        type: 'POST',
        data: data
      })
      .then(resolveWithResp(this))
      .catch(handleError(this));
    }
  },

  invalidate: invalidate(this)
});
