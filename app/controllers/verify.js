import Ember from 'ember';

export default Ember.Controller.extend({
  code:null,
  actions:{
    submitForm:function(){
      if(this.code){
        //check code against api
        this.transitionTo('/users/signup');
        console.log(this.code);
      }
    }
  }
});
