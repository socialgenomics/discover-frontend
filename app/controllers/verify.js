import Ember from 'ember';

export default Ember.Controller.extend({
  code:null,
  needs: 'application',
  actions:{
    submitForm:function(){
      var _this = this;
      if(this.code){
        //check code against api
        Ember.$.ajax({
          url: '/api/invites',
          type:'POST',
          data: {
            'invite':_this.code,
          }
        }).then(function(resp){
          if(resp.permitted){
            _this.set('controllers.application.isVerified', true);
            _this.transitionToRoute('/users/signup');
          }
          console.log(resp.permitted);
        }, function(err){
          console.log(err);
        });
      }
    }
  }
});
