import Ember from 'ember';
import ENV from 'repositive.io/config/environment';

export default Ember.Mixin.create({
//  needs: ['application'], I believe the lookup in the third-pary initalizer is causig this to fail
  actions: {
    authenticateWithGooglePlus: function() {
      var _this = this;
      this.get('torii').open('google-oauth2')
      .then(function(data){
        _this.get('session').authenticate('authenticator:repositive', data);
      })
      .catch(function(err){
        console.log(err)
      })
    },
    authenticateWithLinkedIn: function() {
    },
  },
});
