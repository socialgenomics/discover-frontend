import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive.io/validators/remote/server/mixin';
import ThirdParty from 'repositive.io/mixins/third-party'

export default Ember.Component.extend(
  EmberValidations.Mixin,
  {

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
    emailHasChanged: function(){
      this.sendAction('action', this.get("isValid"));
      this.sendAction('emailChanged', this.get("email"))
    }.observes('email'),

    actions: {
    },

});
