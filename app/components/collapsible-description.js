import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['truncate'],
  showFullDescription: false,

  actions: {
    toggleDescription() {
      this.toggleProperty('showFullDescription');
    }
  }
});
