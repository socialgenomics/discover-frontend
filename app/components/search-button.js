import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn','btn-flat',"grey","white-text"],
  classNameBindings: ['disabled:disabled:'], 
  click: function(){
    this.sendAction();
  }
});