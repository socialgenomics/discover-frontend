import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service(),

  actions: {

    thirdPartyAuth: function(providerName) {
      this.get('session')
      .authenticate('authenticator:torii', providerName)
      .catch((err)=> {
        Ember.Logger.error(err.trace);
      });
    }
  }
});
