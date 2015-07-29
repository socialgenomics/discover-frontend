import Ember from 'ember';

export default Ember.Component.extend({
  isActive:false,
  hasBeenFocused: false,
  value:'',

  showValid: function(){
    return this.get('hasBeenFocused') && Ember.isEmpty(this.get('errors'))
  }.property('hasBeenFocused', 'errors'),

  showInvalid: function(){
    return this.get('hasBeenFocused') && !Ember.isEmpty(this.get('errors'))
  }.property('hasBeenFocused', 'errors'),


  //sets the class names of this component
  classNames:"input-container",
  classNameBindings:['isActive:active', 'showValid:valid', 'showInvalid:invalid'],

  actions: {
    focusedIn:function(){
      this.set("defaultPlaceholder", this.get('placeholder'))
      this.set("placeholder", "");
      this.set ("isActive", true);
    },
    focusedOut:function(){
      this.set("hasBeenFocused", true);
      this.set("placeholder", this.get('defaultPlaceholder'));
      this.set ("isActive", false);
    },
    submitForm:function(){
      this.send('showInvalid');
      this.sendAction('submitForm');
    }
  }
});
