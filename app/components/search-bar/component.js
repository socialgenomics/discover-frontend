import Ember from 'ember';
import QP from 'npm:@repositive/query-parser';
import { task, timeout } from 'ember-concurrency';

import ENV from 'repositive/config/environment';
import { getRandomElement } from 'repositive/utils/arrays';

const { Component, get, inject: { service }, isBlank, set, setProperties, computed, Logger } = Ember;

export default Component.extend({
  queryService: service('query'),
  ajax: service(),
  session: service(),

  classNames: ['c-search-bar'],

  openPagesPlaceholder: 'Search over 1 million human genomic datasets',
  queryTree: null,

  isAuthenticated: computed.alias('session.isAuthenticated'),

  QP: computed(function () {
    return QP;
  }),

  predicates: computed('queryTree', function() {
    // const TEMP_DEFAULT = {key: 'disease', value: 'cancer'};
    const queryTree = get(this, 'queryTree');
    const qp = get(this, 'QP');
    const rawPredicates = queryTree ? qp.filter(queryTree, n => n._type === 'predicate') : [];
    return rawPredicates.map(predicate => Ember.Object.create(predicate));
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
      'query': queryService.getQueryString(),
      'placeholder': get(this, 'isAuthenticated') ?
        this._getSearchPlaceholder(placeholderValues) :
        get(this, 'openPagesPlaceholder')
    });
  },

  actions: {
    handleKeyDown(dropdown, e) {
      if (e.key === "Enter") { e.preventDefault(); }
      if (e.key === 'Enter' && isBlank(dropdown.highlighted)) {
        const queryTree = get(this, 'queryTree');
        const searchBarText = dropdown.searchText;
        const performSearch = get(this, 'search');

        if (queryTree && searchBarText) {
          const queryString = this._constructSearchString(queryTree, searchBarText);
          performSearch(queryString);
        } else if (queryTree) {
          performSearch(QP.toNatural(queryTree));
        } else if (searchBarText) {
          performSearch(QP.toNatural(QP.fromNatural(searchBarText)));
        } else {
          performSearch();
        }
      }
    },

    handleSelection(selection, dropdown) {
      if (selection) {
        const predicate = QP.predicate({ key: selection.groupName, value: selection.suggestionText });
        const queryTree = get(this, 'queryTree');
        if (queryTree) {
          set(this, 'queryTree', QP.and({ left: predicate, right: queryTree }));
        } else {
          set(this, 'queryTree', predicate);
        }

        //Reset the autocomplete component
        setProperties(dropdown, {
          'searchText': null,
          'selected': null
        });
      }
    }
  },

  //TODO since the huginn API will change to take the queryTree, we must transform the string into the tree here
  fetchSuggestions: task(function * (queryString) {
    const DEBOUNCE_MS = 250;
    const REQUEST_OPTIONS = {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ term: queryString})
    };

    yield timeout(DEBOUNCE_MS);

    return get(this, 'ajax')
      .request(ENV.APIRoutes['autocomplete'], REQUEST_OPTIONS)
      .then(this._handleAutocompleteSuccess.bind(this))
      .catch(Logger.error)
  }),

  _constructSearchString(tree, searchText) {
    const searchStringTree = QP.fromNatural(searchText);
    return QP.toNatural(QP.and({ left: tree, right: searchStringTree }));
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
  }
});
