import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import Torii from 'ember-simple-auth/authenticators/torii';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

const { service } = Ember.inject;

export default Torii.extend({
  session: Ember.inject.service(),
  torii: service('torii'),

  authenticate(options) {
    return this._super(options).then(function() {
      ajax({
        url: ENV.APIRoutes[ENV['ember-simple-auth'].authenticationRoute],
        type: 'POST',
        data: options
      })
      console.log(`authorizationCode:\n${data.authorizationCode}\nprovider: ${data.provider}\nredirectUri: ${data.redirectUri}`)
    })
  }
});
