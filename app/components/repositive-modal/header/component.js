import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['c-modal-header', 'u-bc-light-bluegrey', 'u-flex', 'u-justify-between', 'u-content-center', 'u-py1', 'u-px2'],
  classNameBindings: ['alternateBackground:alternate-background'],
  tagName: 'header',
  imgSize: 36
});
