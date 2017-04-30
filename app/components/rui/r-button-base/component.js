import Ember from 'ember';

const { Component, get, Logger, set } = Ember;

/**
 * Super component for buttons.
 * Use only for creating subclasses!
 */
export default Component.extend({
  tagName: 'button',
  classNames: ['c-btn'],
  attributeBindings: ['disabled'],
  layoutName: 'components/rui/r-button-base',

  init() {
    this._super(...arguments);

    this._setSize()
  },

  click() {
    const clickHandler = get(this, 'clickHandler');

    if (clickHandler) {
      clickHandler();
    } else {
      Logger.warn('No click handler action available.');
    }
  },

  /**
   * @desc Sets button size as boolean type if exists (used for classNameBindings).
   * @private
   */
  _setSize() {
    const size = get(this, 'size');

    if (size) {
      set(this, size, true);
    }
  }
});
