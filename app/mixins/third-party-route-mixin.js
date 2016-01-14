import Ember from 'ember';


export default Ember.Mixin.create({
  session: Ember.inject.service(),
  actions: {
    authenticateWithGooglePlus: function() {
      this.get('torii').open('google-oauth2')
      .then((data)=> {
        this.get('session').authenticate('authenticator:repositive', data);
      })
      .catch((err)=> {
        Ember.Logger.error(err.trace);
      });
    },
    authenticateWithLinkedIn: function() {
      this.get('torii').open('linked-in-oauth2')
      .then((data)=> {
        this.get('session').authenticate('authenticator:repositive', data);
      })
      .catch((err)=> {
        Ember.Logger.error(err.trace);
      });
    }
  }
});
