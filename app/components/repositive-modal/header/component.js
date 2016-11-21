import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['modal-header'],
  classNameBindings: ['alternateBackground'],
  tagName: 'header',
  imgSize: 36
});
