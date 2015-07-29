import Ember from 'ember';
import ENV from 'repositive.io/config/environment';
import ajax from 'ic-ajax';

export default Ember.Mixin.create({
//  needs: ['application'], I believe the lookup in the third-pary initalizer is causig this to fail
  actions: {
    authenticateWithGooglePlus: function() {
      this.get('session')
      .authenticate('simple-auth-authenticator:torii', 'google-oauth2')
      .then(function(data){
        console.log('logged in')
        return this.authorizeWithAPI(data).then(function(){
          console.log('authorized with api');
        })
      }.bind(this))
      .catch(function(err){
        console.log(err);
        console.log('login failed');
      });
    },
    authenticateWithLinkedIn: function() {
      this.get('session')
      .authenticate('simple-auth-authenticator:torii', 'linked-in-oauth2')
      .then(this.authorizeWithAPI)
      .then(console.log.bind('Authorized'))
      .catch(function(err){
        console.log(err);
        console.log('linkedIn login failed');
      });
    },
  },
  authorizeWithAPI: function(data){
    console.log(data);
    if (data === undefined){ data = this.get("session").get("store").restore(); }
    // var currentPath = this.get('controllers.application.currentPath'); - cannot get controller:application without the above needs
    var currentPath = (function(){
      var p = window.location.href;
      return p.split('/').slice(3, p.split('/').length).join('.');
    }());
    return ajax({
      url: ENV.APIRoutes[currentPath],
      type: 'POST',
      data: data
    })
    .then(function(resp){
      this.set('session.token', resp.token);
      this.set('session.user', resp.user);
    }.bind(this))
    .catch(function(err){
      // server denied authorisation - invalidate the session
      this.get("session").invalidate()
     // if (currentPath === ENV['simple-auth'].authenticationRoute){
     //  _this.get("session").invalidate().then(function(){
     //     _this.transitionToRoute(ENV['simple-auth'].authenticationRoute);
     //     _this.showMessages(xhr.responseJSON.errors);
     //   });
     // }
    }.bind(this));
  }
});
