import Ember from 'ember';

const { Component, get, Logger, set } = Ember;

export default Component.extend({
  layoutName: 'components/rui/r-button',
  tagName: 'button',
  attributeBindings: ['disabled'],
  classNames: ['c-btn'],
  classNameBindings: [
    // types
    'primary:c-btn-primary',
    'secondary:c-btn-secondary',
    'cancel:c-btn-cancel',

    // states
    'loading:c-btn-loading',

    // sizes
    'small:u-px2',
    'small:u-py1'
  ],

  options: {
    defaultType: 'secondary',
    type: ['primary', 'secondary', 'cancel'],
    defaultSize: 'small',
    size: ['small', 'big']
  },

  init() {
    this._super(...arguments);

    // set option flags used for className bindings
    ['type', 'size'].forEach(key => this._setOptionFlag(key));
  },

  click() {
    const clickHandler = get(this, 'clickHandler');

    if (clickHandler) { clickHandler(); }
  },

  /**
   * @desc sets flag based of option value passed during component invocation
   * @param {String} optionName
   * @private
   */
  _setOptionFlag(optionName) {
    const value = get(this, optionName);
    const flagName = get(this, `options.${optionName}`).indexOf(value) === -1 ?
      get(this, `options.default${optionName.capitalize()}`) :
      value;

    set(this, flagName, true);
  }
});
