import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'full-width'],
  classNameBindings: ['disabled:disabled:'],
  click: function(){
    this.sendAction();
  }
});
