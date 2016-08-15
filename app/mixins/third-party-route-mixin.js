import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service(),

  actions: {
    thirdPartyAuth: function(providerName) {
      this.get('session').authenticate('authenticator:torii', providerName)
      .then(() => {
        this.get('session').set('data.firstVisit', true)
        .then(() => this.get('session').set('data.displayWelcomeMessage', false))
        .catch(this.displayMessage.bind(this));
      })
      .catch((err)=> {
        Ember.Logger.error(err.trace);
      });
    }
  }
});
