import Ember from 'ember';

const { set, Service, get } = Ember;

export default Service.extend({
  router: null,

  /**
   * @param {Object} router - Ember router object
   */
  initialize(router) {
    set(this, 'router', router);
  },

  /**
   * @param {String} route - route name (same as used for link-to helper)
   * @param {Number} id - model id
   * @returns {String} - absolute URL
   */
  generateUrl(route, id) {
    const router = get(this, 'router');

    if (router === null) {
      throw new Error('GenerateUrl service was not initialized');
    }

    return window.location.protocol + '//' + window.location.host + router.generate(route, id);
  }
});
