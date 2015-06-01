import Ember from 'ember';

export default Ember.Component.extend({
  isActive: false,
  isValid: false,
  isInvalid: false,
  errors: [],
  value: '',
  classNames: "input-container",
  classNameBindings: [
    'isActive:active', 
    'isValid:valid',
    'isInvalid:invalid'
  ],

  actions: {

    showErrors: function() {
      return Ember.none(this.get('errors'))
    }.property('errors'),

    focusedIn:function(){
      this.set("placeholder", "");
      this.set ("isActive", true);
    },

    focusedOut:function(){
      this.set("placeholder", this.placeholder);
      this.send('showErrors');
      this.set ("isActive", false);
      if (this.errors.length > 0){
        this.set("isValid",false);
        this.set("isInvalid",true);
      }
      else{
        this.set("isValid", true);
        this.set("isInvalid", false);
      }
    },

    submitForm:function(){
      this.sendAction('submitForm');
    }

  }
});
