import Ember from 'ember';
import { getRandomElement } from 'repositive/utils/arrays'
const { Component, get, inject: { service }, set, computed } = Ember;

export default Component.extend({
  queryService: service('query'),
  placeholderValues: [
    `title:cancer description:glioblastoma`,
    `(tissue:brain OR tissue:cortex) description:methylation`,
    `"oxidative stress" assay:RNA-Seq`,
    `access:Open description:sleep`,
    `(ALS OR "Amyotrophic Lateral Sclerosis" OR MND) (assay:WGS OR assay:RNA OR assay:sequencing) NOT datasource:SRA`,
    `ethnicity:asian NOT cancer`,
    `Caucasian sex:female`
  ],

  init() {
    this._super(...arguments);
    const queryService = get(this, 'queryService');
    set(this, 'query', queryService.getQueryString());
    set(this, 'placeholder', this._getRandomSearchPlaceholder());
  },


  query: computed('queryService.queryString', {
    get() {
      return get(this, 'queryService').getQueryString();
    },
    set(key, value) {
      return value;
    }
  }),

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
  _getRandomSearchPlaceholder() {
    return getRandomElement(get(this, 'placeholderValues'));
  }
});
