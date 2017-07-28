import Ember from 'ember';
import { getRandomElement } from 'repositive/utils/arrays'
import ENV from 'repositive/config/environment';
const { Component, get, inject: { service }, setProperties, computed, set } = Ember;

export default Component.extend({
  queryService: service('query'),
  ajax: service(),
  autocompletionOpen: false,
  autocompletions: {},
  autocompletion: Ember.computed('autocompletions.@each', function() {
    return Object.keys(this.get(`autocompletions`)).map((k) => {
      return {
        key: k,
        values: this.get('autocompletions')[k]
      };
    });
  }),

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
      'placeholder': this._getSearchPlaceholder(get(this, 'placeholderValues'))
    });
  },

  actions: {
    search(query) {
      get(this, 'search')(query.trim()); //calls search on application route
    },
    autocomplete(query) {
      if (query) {
        return get(this, 'ajax').request(
          ENV.APIRoutes['autocomplete'],{
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ term: query})
          }
        ).then( (res) => {
          // The request is been made and returns correct results
          console.log(res);
          //TODO populate a div with the results as first steps.
          //How to define a variable accesible for component AND template
          const autocompletionKeys = Object.keys(res);
          if (autocompletionKeys.length > 0) {
            this.set('autocompletions', res);
            this.set('autocompletionOpen', true);
          }
        });
      } else {
        set(this, 'autocompletionOpen', false);
      }
    }
  },

  /**
   * @desc returns random search term placeholder
   * @returns {String}
   * @private
   */
  _getSearchPlaceholder(placeholderList) {
    return getRandomElement(placeholderList);
  },

  _getArray(autocompletionKeys, key) {
    return autocompletionKeys[key];
  }
});
