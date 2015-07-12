import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive.io/validators/remote/server/mixin';
import ENV from 'repositive.io/config/environment';

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
      if(this.code){
        //check code against api
        Ember.$.ajax({
          url: ENV.APIRoutes['invites'],
          type:'POST',
          data: {
            'invite':this.code,
          }
        }).then(function(resp){
          if(resp.permitted){
            this.set('controllers.application.isVerified', true);
            this.transitionToRoute('/users/signup');
          }
          else{
            this.addValidationErrors(resp.errors);
          }
        }.bind(this), 
        function(xhr, status, error){
          this.addValidationErrors(xhr.responseJSON.errors);
          console.log(err);
        }.bind(this));
      }
    }
  }
});
