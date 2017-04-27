import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['c-modal-header', 'u-bc-light-bluegrey', 'px3'],
  classNameBindings: ['alternateBackground:alternate-background'],
  tagName: 'header',
  imgSize: 36
});
