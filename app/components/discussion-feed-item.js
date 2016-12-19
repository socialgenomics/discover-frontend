import Ember from 'ember';

const { Component, $ } = Ember;

export default Component.extend({
  didRender() {
    this._super(...arguments);
    $('.tooltipped').tooltip({ delay: 300 });
  }
});
