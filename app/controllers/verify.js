import Ember from 'ember';

export default Ember.Controller.extend({
  code:null,
  needs: 'application',
  actions:{
    submitForm:function(){
      if(this.code){
        //check code against api
        this.set('controllers.application.isVerified', true);
        this.transitionTo('/users/signup');

        console.log(this.code);
      }
    }
  }
});
