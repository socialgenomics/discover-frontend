import Ember from 'ember';
import ENV from 'repositive.io/config/environment';

export default Ember.Mixin.create({
  needs: ['application'],
  actions: {
    authenticateWithGooglePlus: function() {
      var _this = this;
      this.get('session').authenticate('simple-auth-authenticator:torii', 'google-oauth2').then(function(data){
        _this.authorizeWithAPI(data);
      }, function(err){
         console.log('login failed')
      });
    },
    authenticateWithLinkedIn: function() {
      var _this = this;
      this.get('session').authenticate('simple-auth-authenticator:torii', 'linked-in-oauth2').then(function(value){
        _this.authorizeWithAPI(data);
      }, function(err){
         console.log('linkedIn login failed')
      });
    },
  },
  authorizeWithAPI: function(data){
    if (data === undefined){ data = this.get("session").get("store").restore(); }
    var _this = this;
    var currentPath = this.get("controllers.application").currentPath;
    var url = ENV.APIRoutes[currentPath];
    Ember.$.ajax({
      url: url,
      type: 'POST',
      data: data
    }).then(function(resp){
      _this.set('session.token', resp.token)
      _this.set('session.user', resp.user)
    }, function(xhr, status, error){
      console.log(xhr.responseJSON)
    });
  }
});
