import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive/validators/remote/server/mixin';
import ENV from 'repositive/config/environment';
import ajax from 'ic-ajax';


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
      //check code against api
      ajax({
        url: ENV.APIRoutes['invites'],
        type:'POST',
        data: {
          'invite':this.code,
        }
      })
      .then((resp)=>{
        if(resp.permitted){
          this.set('controllers.application.isVerified', true);
          this.set('controllers.application.code', this.get('code'));
          this.transitionToRoute('/users/signup');
        }
        else{
          this.addValidationErrors(resp.errors);
        }
      })
      .error((xhr, status, error)=>{
        Ember.Logger.error(error);
        this.addValidationErrors(xhr.responseJSON.errors);
      });
    }
  }
});
