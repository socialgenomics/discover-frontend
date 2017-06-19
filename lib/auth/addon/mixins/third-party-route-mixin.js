import Ember from 'ember';

const { inject: { service }, Mixin, get, Logger, setProperties } = Ember;

export default Mixin.create({
  session: service(),

  actions: {
    thirdPartyAuth(providerName, type) {
      get(this, 'session').authenticate('authenticator:torii', providerName)
        .then(() => {
          if (type === 'signup') {
            setProperties(this, {
              'session.data.firstVisit': true,
              'data.displayWelcomeMessage': false,
              'data.thirdPartySignup': true
            });
          }
        })
        .catch(err => {
          Logger.error(err.trace);
        });
    }
  }
});
