import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  isStarred:false,
  classNameBindings: ['isStarred:starred'],
  click: function(){
    this.toggleProperty("isStarred");
  }
});
