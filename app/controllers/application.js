import Ember from 'ember';


export default Ember.Controller.extend({
  isVerified:false,
  isLandingPage:function(){
    var currentPath = this.get('currentPath');
    var isAuthenticated = this.get('session.isAuthenticated');
    if(currentPath === "root" && isAuthenticated === false){
      return true;
    }
  }.property('currentPath', 'session.isAuthenticated')
});
