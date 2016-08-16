import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';
import {invalidate} from './repositive';

export default Torii.extend({
  torii: Ember.inject.service('torii'),
  ajax: Ember.inject.service('ajax'),

  restore: function(data) {
    return new Ember.RSVP.Promise(resolve => {
      resolve(data);
    })
  },

  /**
   * docs
   * https://tech.liftforward.com/2016/01/19/ember-simple-auth-torii-google-oauth2-part-1.html
   * @param options
   * @returns {*}
   */
  authenticate(options) {
    return this._super(options).then(function (data) {
      return ajax({
        url: ENV.APIRoutes['auth.oauth'],
        method: 'post',
        data: {
          provider: data.provider,
          auth_code: data.authorizationCode
        }
      })
      .then(function(response) {
        return Object.assign(response, data);
      });
    });
  },

  invalidate: invalidate(this)
});
