import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'grey', 'white-text', 'valign-wrapper'],
  classNameBindings: ['disabled:disabled'],
  click: function() {
    this.sendAction();
  }
});
