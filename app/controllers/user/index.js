import Ember from 'ember';

export default Ember.Controller.extend({
  //REFACTOR THISSSSS
  requestCount:null,
  registrationCount:null,
  
  requests:function(){
    var usr= this.get('model.user.id');
    var datasets = this.get('model.datasets');
    if(usr == undefined){
      this.flashMessage({
        content: 'No user exists with that username.', // String
        duration:4000, // Number in milliseconds
        type: 'Fail', // String
      });
    }else{
      //apologies for this...had to be done. will refactor later
      this.set('requestCount',datasets.filterBy('isRequest',true).length)
      this.set('registrationCount',datasets.filterBy('isRequest',false).length)
      return datasets.filterBy('isRequest',true);
    }
  }.property('isRequest'),


});
