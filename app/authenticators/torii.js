import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from 'repositive/config/environment';
import {invalidate, handleError, resolveWithResp} from './repositive';

const { get, inject: { service }, RSVP } = Ember;

export default Torii.extend({
  torii: service('torii'),
  ajax: service('ajax'),

  restore: function(data) {
    return new RSVP.Promise(resolve => {
      resolve(data);
    });
  },
  /**
   * docs
   * https://tech.liftforward.com/2016/01/19/ember-simple-auth-torii-google-oauth2-part-1.html
   * @param options
   * @returns {*}
   */
  authenticate(options) {
    let self = this;
    return this._super(options).then((data) => {
      return get(this, 'ajax').request(ENV.APIRoutes['auth.oauth'], {
        method: 'POST',
        data: {
          provider: data.provider,
          auth_code: data.authorizationCode
        }
      })
        .then(resolveWithResp(self))
        .catch(handleError(self));
    });
  },

  invalidate: invalidate(this)
});
