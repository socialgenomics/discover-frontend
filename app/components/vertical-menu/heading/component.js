import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['flex', 'items-center', 'justify-between', 'p3'],

  click() {
    get(this, 'handleClick')(get(this, 'title'));
  }
});
