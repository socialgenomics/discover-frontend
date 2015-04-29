import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive.io/validators/remote/server/mixin';
import ThirdParty from 'repositive.io/mixins/third-party'

export default Ember.Component.extend(
  EmberValidations.Mixin,
  ServerValidationMixin,
  ThirdParty,{

    email:null,
    showErrors:true,

    validations: {
      email: {
        presence: true,
        presence:{message:"You missed this one."},
        format: {
          with: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
          message: 'Must be a valid e-mail address'
        },
        // must go last - somthing todo with observables being syncronous
        //server: true,
      },
    },

    didInsertElement: function(){
      $('#input-email').focus(function(){
        $(this).parents('.input-container').addClass("active");
        $(this).attr("placeholder", "")
      });
      $('#input-email').focusout(function(){
        if(!$(this).val()){
          $(this).parents('.input-container').removeClass("active");
          $(this).attr("placeholder", this.name);
        }
      });
    },
    //show errors on focus out
    isValidHasChanged: function(){
      var isValid = this.get('isValid');

      this.sendAction('action', this.get("emailValid"));
    }.property('emailValid'),

    actions: {

    },

});
