import Ember from 'ember';

export default Ember.Controller.extend({
  bgColour: function(){
    if(['users.login', 'users.signup'].indexOf(this.get('currentPath')) != -1){
      return 'white'
    }
    else{
      return 'bg-grey'
    }
  }.property('currentPath'),
  actions:{
  },
});
