import Ember from 'ember';

export default Ember.Component.extend({
  isActive:false,
  isValid:false,
  isInvalid:false,
  value:'',
  //sets the class names of this component
  classNames:"input-container",
  classNameBindings:['isActive:active', 'isValid:valid', 'isInvalid:invalid'],
  //watch input for type
  watchInput: function(){
    if(this.errors.length > 0){
      this.set("isValid",false);
      this.set("isInvalid",true);
    }else{
      this.set("isValid", true);
      this.set("isInvalid", false);
    }
  }.observes('value'),

  actions: {
    showErrors: function() {
      this.set("showError", true);
    },
    focusedIn:function(){
      this.set("placeholder", "");
      this.set ("isActive", true);
    },
    focusedOut:function(){
      this.set("placeholder", this.type);
      this.send('showErrors');
      this.set ("isActive", false);
    },
  }
});
