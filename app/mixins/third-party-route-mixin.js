import Ember from 'ember';
import ENV from 'repositive/config/environment';

export default Ember.Mixin.create({
//  needs: ['application'], I believe the lookup in the third-pary initalizer is causig this to fail
  actions: {
    authenticateWithGooglePlus: function() {
      this.get('torii').open('google-oauth2')
      .then((data)=>{
        this.get('session').authenticate('authenticator:repositive', data);
      })
      .catch((err)=>{
        Ember.Logger.error(err.trace);
      })
    },
    authenticateWithLinkedIn: function() {
      this.get('torii').open('linked-in-oauth2')
      .then((data)=>{
        this.get('session').authenticate('authenticator:repositive', data);
      })
      .catch((err)=>{
        Ember.Logger.error(err.trace);
      })
    },
  },
});
