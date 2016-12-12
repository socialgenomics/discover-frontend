import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'repositive/config/environment';

const { RSVP, inject: { service }, get } = Ember;

export function handleError(ctx) {
  return function(err) {
    if (err.jqXHR !== undefined) {
      return RSVP.reject(err.jqXHR.responseJSON);
    } else {
      throw err;
    }
  };
}

export function resolveWithResp(ctx) {
  return function(resp) {
    return resp;
  };
}

export function invalidate(ctx) {
  return function(user) {
    return get(this, 'ajax').request(ENV.APIRoutes[ENV['ember-simple-auth'].logoutRoute], {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ token: user.payload.token })
    }).catch(handleError(ctx));
  };
}

export default Base.extend({
  ajax: service(),
  metrics: service(),
  session: service(),
  restore: function(data) {
    return new RSVP.Promise(resolve => {
      // TODO: display any notifications - i.e if you have new messages etc
      resolve(data);
    });
  },

  authenticate: function(data) {
    if ('provider' in data) {
      // this is a third party login
      return get(this, 'ajax').raw(ENV.APIRoutes['users.login'], {
        method: 'POST',
        contentType: 'application/json',
        data: data
      })
        .then(resolveWithResp(this))
        .catch(handleError(this));
    } else {
      return get(this, 'ajax').raw(ENV.APIRoutes[ENV['ember-simple-auth'].authenticationRoute], {
        method: 'POST',
        data: data
      })
        .then(resolveWithResp(this))
        .catch(handleError(this));
    }
  },

  invalidate: invalidate(this)
});
