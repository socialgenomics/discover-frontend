import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn','btn-flat',"white-text", "valign-wrapper"],
  classNameBindings: ['disabled:disabled:'], 
  click: function(){
    this.sendAction();
  }
});