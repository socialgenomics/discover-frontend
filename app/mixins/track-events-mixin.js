import Ember from 'ember';

const { get, Mixin } = Ember;

export default Mixin.create({
  /**
   * @desc tracks dataset registration
   * @param {String} category
   * @param {String} action
   * @param {String} label
   * @private
   */
  trackEvent(category, action, label) {
    get(this, 'metrics').trackEvent({ category, action, label });
  }
});
