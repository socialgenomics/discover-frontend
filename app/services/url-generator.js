import Ember from 'ember';

const { set, Service, get } = Ember;

export default Service.extend({
  router: null,

  /**
   * @desc
   * @param {Object} router
   */
  initialize(router) {
    set(this, 'router', router);
  },

  /**
   * @desc
   * @param {String} route
   * @param {Number} id
   * @returns {String}
   */
  generateUrl(route, id) {
    const router = get(this, 'router');

    if (router === null) {
      throw new Error('GenerateUrl service was not initialized');
    }

    return window.location.protocol + '//' + window.location.host + router.generate(route, id);
  }
});
