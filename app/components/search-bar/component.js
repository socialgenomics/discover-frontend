import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { getRandomElement } from 'repositive/utils/arrays';

const { Component, get, getWithDefault, inject: { service }, setProperties, computed, Logger } = Ember;

export default Component.extend({
  queryService: service('query'),
  ajax: service(),
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
      'query': queryService.getQueryString(),
      'placeholder': get(this, 'isAuthenticated') ?
        this._getSearchPlaceholder(placeholderValues) :
        get(this, 'openPagesPlaceholder')
    });
  },

  actions: {
    handleKeyDown(dropdown, e) {
      if (e.key === 'Enter') {
        get(this, 'search')(dropdown.searchText);
      }
    },

    handleSelection(selection, dropdown) {
      if (selection) {
        // push selection into selections arrays
        // clear current selection
        debugger;
        const newQuery = getWithDefault(this, 'query', '') +  ' '  + selection.toString().trim();
        setProperties(this, {
          'suggestion': selection,
          'query': newQuery
        });
      }
    },

    fetchSuggestions(queryString) {
      return get(this, 'ajax').request(
        ENV.APIRoutes['autocomplete'],{
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ term: queryString})
        }
      )
        .then(this._handleAutocompleteSuccess.bind(this))
        .catch(Logger.error)
    }
  },

  _handleAutocompleteSuccess(resp) {
    const suggestionKeys = Object.keys(resp) || [];
    return suggestionKeys
      .reduce((acc, key) => {
        const list = resp[key];

        if (list.length > 0) {
          return [...acc, ...[{ groupName: key, options: list }]];
        }

        return acc;
      }, []);
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
