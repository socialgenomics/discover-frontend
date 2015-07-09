import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive.io/validators/remote/server/mixin';

export default Ember.Controller.extend(
  EmberValidations.Mixin,
  ServerValidationMixin,
{
  code:null,
  needs: 'application',

  validations:{
    code:{
      presence:true,
      server: true, // must be last - unknown bug
    },
  },

  actions:{
    submitForm:function(){
      var _this = this;
      if(this.code){
        //check code against api
        Ember.$.ajax({
          url: ENV.APIRoutes['invite'],
          type:'POST',
          data: {
            'invite':_this.code,
          }
        }).then(function(resp){
          if(resp.permitted){
            _this.set('controllers.application.isVerified', true);
            _this.transitionToRoute('/users/signup');
          }
          else{
            _this.addValidationErrors({'code':'This code is incorrect.'});
          }
        }, function(xhr, status, error){
          _this.addValidationErrors(xhr.responseJSON.errors);
          console.log(err);
        });
      }
    }
  }
});
