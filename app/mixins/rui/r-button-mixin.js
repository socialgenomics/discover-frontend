import Ember from 'ember';

const { Mixin, get, set } = Ember;

export default Mixin.create({
  classNames: ['c-btn', 'u-cursor-pointer', 'u-inline-block', 'u-rounded', 'u-pos-relative', 'u-fw-med'],
  classNameBindings: [
    // types
    'primary:c-btn-primary',
    'secondary:c-btn-secondary',
    'cancel:c-btn-cancel',

    // states
    'loading:c-btn-loading',

    // sizes
    'big:c-btn-large',
    'small:c-btn-small'
  ],

  options: {
    variant: ['primary', 'secondary', 'cancel'],
    size: ['small', 'big']
  },

  defaults: {
    variant: 'secondary',
    size: 'small'
  },

  init() {
    this._super(...arguments);

    // set option flags used for className bindings
    Object.keys(get(this, 'options')).forEach(key => this._setOptionFlag(key));
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
