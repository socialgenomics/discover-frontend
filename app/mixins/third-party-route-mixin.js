import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service(),

  actions: {
    thirdPartyAuth: function(providerName, type) {
      this.get('session').authenticate('authenticator:torii', providerName)
      .then(() => {
        if (type === 'signup') {
          this.get('session').set('data.firstVisit', true)
          .then(() => this.get('session').set('data.displayWelcomeMessage', false))
          .then(() => this.get('session').set('data.thirdPartySignup', true))
          .catch(this.displayMessage.bind(this));
        }
      })
      .catch((err)=> {
        Ember.Logger.error(err.trace);
      });
    }
  }
});
