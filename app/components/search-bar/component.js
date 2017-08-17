import Ember from 'ember';
import ENV from 'repositive/config/environment';
import { getRandomElement } from 'repositive/utils/arrays';
import QP from 'npm:@repositive/query-parser';

const { Component, get, inject: { service }, set, setProperties, computed, Logger } = Ember;

export default Component.extend({
  queryService: service('query'),
  ajax: service(),
  session: service(),

  openPagesPlaceholder: 'Search over 1 million human genomic datasets',
  queryTree: null,

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

    handleSelection(selection) {
      if (selection) {
        const predicate = QP.predicate({ key: selection.groupName, value: selection.suggestionText });
        const queryTree = get(this, 'queryTree');
        if (queryTree) {
          set(this, 'queryTree', QP.and({ left: predicate, right: queryTree }));
        } else {
          set(this, 'queryTree', predicate);
        }

        // const newQuery = getWithDefault(this, 'query', '') +  ' '  + selection.toString().trim();
        // setProperties(this, {
        //   'suggestion': selection,
        //   'query': newQuery
        // });
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
      .reduce((acc, groupName) => {
        const suggestions = resp[groupName];

        if (suggestions.length > 0) {
          const options = suggestions.map(suggestionText => {
            return { groupName, suggestionText };
          });

          return [...acc, ...[{ groupName, options }]];
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
