import Ember from 'ember';
import { getRandomElement } from 'repositive/utils/arrays'
const { Component, get, inject: { service }, setProperties, computed, set } = Ember;

export default Component.extend({
  queryService: service('query'),
  session: service(),

  openPagesPlaceholder: 'Search over 1 million human genomic datasets',

  isAuthenticated: computed.alias('session.isAuthenticated'),

  query: computed('queryService.queryString', {
    get() {
      return get(this, 'queryService').getQueryString();
    },
    set(key, value) {
      return value;
    }
  }),

  init() {
    this._super(...arguments);
    set(this, 'placeholderValues', [
      `obesity AND microbiome`,
      `autism AND assay:"RNA seq"`,
      `infant stool AND assay:wgs`,
      `Alzheimer's disease`,
      `fetal epigenome`,
      `human populations AND (assay:"Whole Genome Sequencing" OR assay:WGS)`
    ]);

    const queryService = get(this, 'queryService');
    setProperties(this, {
      'query': queryService.getQueryString(),
      'placeholder': get(this, 'isAuthenticated') ?
        this._getSearchPlaceholder(get(this, 'placeholderValues')) :
        get(this, 'openPagesPlaceholder')
    });
  },

  actions: {
    search(query) {
      get(this, 'search')(query.trim()); //calls search on application route
    }
  },

  /**
   * @desc returns random search term placeholder
   * @returns {String}
   * @private
   */
  _getSearchPlaceholder(placeholderList) {
    return getRandomElement(placeholderList);
  }
});
