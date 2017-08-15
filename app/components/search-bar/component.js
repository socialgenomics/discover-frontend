import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { getRandomElement } from 'repositive/utils/arrays';

const { Component, get, inject: { service }, setProperties, computed, set, Logger } = Ember;

export default Component.extend({
  queryService: service('query'),
  ajax: service(),
  session: service(),
  openPagesPlaceholder: 'Search over 1 million human genomic datasets',
  autocompletionOpen: false,

  isAuthenticated: computed.alias('session.isAuthenticated'),
  suggestions: computed('autocompletions.@each', function() {
    return Object.keys(get(this, `autocompletions`))
      .reduce((acc, key) => {
        const list = get(this, 'autocompletions')[key];

        if (list.length > 0) {
          return [...acc, ...[{ key, values: list }]];
        }

        return acc;
      }, []);
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

    const placeholderValues = [
      `obesity AND microbiome`,
      `autism AND assay:"RNA seq"`,
      `infant stool AND assay:wgs`,
      `Alzheimer's disease`,
      `fetal epigenome`,
      `human populations AND (assay:"Whole Genome Sequencing" OR assay:WGS)`
    ];
    const queryService = get(this, 'queryService');

    setProperties(this, {
      'autocompletions': {},
      'query': queryService.getQueryString(),
      'placeholder': get(this, 'isAuthenticated') ?
        this._getSearchPlaceholder(placeholderValues) :
        get(this, 'openPagesPlaceholder')
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
        )
          .then(this._handleAutocompleteSuccess.bind(this))
          .catch(Logger.error)
      } else {
        set(this, 'autocompletionOpen', false);
      }
    }
  },

  _handleAutocompleteSuccess(resp) {
    const autocompletionKeys = Object.keys(resp);
    if (autocompletionKeys.length > 0) {
      set(this, 'autocompletions', resp);
      set(this, 'autocompletionOpen', true);
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
