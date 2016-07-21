import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import Torii from 'ember-simple-auth/authenticators/torii';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

export default Ember.Mixin.create({
  session: Ember.inject.service(),

  actions: {
    thirdPartyAuth: function(providerName) {
      this.get('torii').open(providerName)
      .then((data)=> {
        this.get('session').authenticate('authenticator:repositive', data);
      })
      .catch((err)=> {
        Ember.Logger.error(err.trace);
      });
    }
  }
});
