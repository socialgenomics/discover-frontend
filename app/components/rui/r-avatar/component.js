import Ember from 'ember';

const { Component, get, set, $ } = Ember;

export default Component.extend({
  tagName: 'img',
  classNames: ['circle'],

  attributeBindings: ['src'],

  classNameBindings: [
    // sizes
    'small:icon-small',
    'medium:icon-medium',
    'large:icon-large',
    'x-large:icon-x-large'
  ],

  options: {
    size: ['small', 'medium', 'large', 'x-large']
  },

  defaults: {
    size: 'medium'
  },

  init() {
    this._super(...arguments);

    // TODO: this logic is also used for buttons, create a generalised logic helper.
    // set option flags used for className bindings
    Object.keys(get(this, 'options')).forEach(key => this._setOptionFlag(key));
  },

  didRender() {
    this._super(...arguments);
    $(".circle").on("error", function() {
      $(this).attr('src', '../assets/images/avatar/dog.png');
    })
  },

  /**
   * @desc sets flag based of option value passed during component invocation
   * @param {String} flagType
   * @private
   */
  _setOptionFlag(flagType) {
    const flagName = get(this, flagType);

    set(this, (this._isValidFlagName(flagType, flagName) ? flagName : get(this, `defaults.${flagType}`)), true);
  },

  /**
   * @desc checks if given flag name is valid
   * @param {String} flagType
   * @param {String} flagName
   * @returns {Boolean}
   * @private
   */
  _isValidFlagName(flagType, flagName) {
    return get(this, `options.${flagType}`).indexOf(flagName) !== -1;
  }
});
