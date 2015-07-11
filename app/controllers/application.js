import Ember from 'ember';

export default Ember.Controller.extend({
  isVerified:false,
  bgColour: function(){
    if(['users.login','users.signup'].indexOf(this.get('currentPath')) != -1){
      return 'white';
    }
    else{
      return 'bg-grey';
    }
  }.property('currentPath'),

  isLandingPage:function(){
    var currentPath = this.get('currentPath');
    var isAuthenticated = this.get('session.isAuthenticated');
    if(currentPath == "root" && isAuthenticated == false){
      return true;
    }
  }.property('currentPath', 'session.isAuthenticated'),

  actions:{
  },
});
