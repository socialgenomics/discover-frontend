import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ServerValidationMixin from 'repositive.io/validators/remote/server/mixin';
import ThirdParty from 'repositive.io/mixins/third-party'

export default Ember.Component.extend(
  EmberValidations.Mixin,
  ServerValidationMixin,
  ThirdParty,{

    password:null,
    showErrors:true,
    validations: {
      password: {
        presence: true,
        presence: {message:"You missed this one."},
        length: { minimum: 8, messages:{tooShort:"Must be at least 8 characters."}},
        server: true,
      },
    },

    didInsertElement: function(){
      $('#input-password').focus(function(){
        $(this).parents('.input-container').addClass("active");
        $(this).attr("placeholder", "")
      });
      $('#input-password').focusout(function(){
        if(!$(this).val()){
          $(this).parents('.input-container').removeClass("active");
          $(this).attr("placeholder", this.name);
        }
      });
    },

    isValidHasChanged: function(){
      this.sendAction('action', this.get("isValid"));
    }.property('isValid'),
    
    actions: {
    },


});
