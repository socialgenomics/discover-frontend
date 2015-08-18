import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';

export default Ember.Controller.extend(
  EmberValidations,
  ServerValidationMixin,
{
  queryParams: ['code'],
  code: null,
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
        })
        .then(function(resp){
          if(resp.permitted){
            this.set('controllers.application.isVerified', true);
            //calq code to track use of invite codes
            console.log(this.get('code'));
            calq.user.profile(

              {"InviteCode": this.get('code')}
            )
            this.transitionToRoute('/users/signup');
          }
          else{
            this.addValidationErrors(resp.errors);
          }
        }.bind(this),
        function(xhr, status, error){
          Ember.Logger.error(error)
          this.addValidationErrors(xhr.responseJSON.errors);
        }.bind(this));
      }
    }
  }
});
