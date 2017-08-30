import Ember from 'ember';
import QP from 'npm:@repositive/query-parser';
import { task, timeout } from 'ember-concurrency';

import ENV from 'repositive/config/environment';
import { getRandomElement } from 'repositive/utils/arrays';

const { assign, Component, get, inject: { service }, isBlank, set, setProperties, computed, Logger } = Ember;

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
    const queryTree = get(this, 'queryTree');
    const qp = get(this, 'QP');
    const rawPredicates = queryTree ? qp.filter(queryTree, n => n._type === 'predicate') : [];
    return rawPredicates.map(predicate => Ember.Object.create(predicate));
  }),

  // query: computed('queryService.queryString', {
  //   get() {
  //     return get(this, 'queryService').getQueryString();
  //   },
  //   set(key, value) {
  //     return value;
  //   }
  // }),

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
    const queryString = get(this, 'queryService').getQueryString();

    setProperties(this, {
      queryString,
      'queryToken': queryString,
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
          set(this, 'queryToken', searchBarText);
          performSearch(queryString);
        } else if (queryTree) {
          performSearch(QP.toNatural(queryTree));
        } else if (searchBarText) {
          set(this, 'queryToken', searchBarText);
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
    },

    removePredicate(predicate) {
      const queryTree = get(this, 'queryTree');
      const newTree = QP.remove(queryTree, predicate);
      set(this, 'queryTree', newTree);
    },

    getPredicateText(predicate) {
      return `${predicate.key}: ${predicate.value}`;
    }
  },

  fetchSuggestions: task(function * (queryString) {
    const DEBOUNCE_MS = 250;
    const queryTree = get(this, 'queryTree');
    const tokenWithAutocomplete = assign({}, QP.token(queryString), { 'autocomplete': true });
    const newTree = this._constructAutoCompleteTree(queryTree, tokenWithAutocomplete);
    const requestData = {
      tree: newTree,
      limit: 3
    };
    const requestOptions = {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestData)
    };

    set(this, 'queryTree', newTree);

    yield timeout(DEBOUNCE_MS);

    return get(this, 'ajax')
      .request(ENV.APIRoutes['autocomplete'], requestOptions)
      .then(this._handleAutocompleteSuccess.bind(this))
      .catch(Logger.error)
  }),

  _constructAutoCompleteTree(queryTree, autocompleteToken) {
    if (queryTree) {
      const currentNode = QP.filter(queryTree, node => node.autocomplete === true)[0];

      return currentNode ?
        QP.replace({ on: queryTree, target: currentNode, replacement: autocompleteToken }) :
        this._appendToTree(queryTree, autocompleteToken);
    }
    return autocompleteToken;
  },

  /**
   * _appendToTree - Adds new node to the right.
   * @param {node?} queryTree - The existing tree
   * @param {node} node - Node to be added
   * @return {node} Description
   */
  _appendToTree(queryTree, node) {
    return QP.and({ left: queryTree, right: node });
  },

  _constructSearchString(tree, searchText) {
    const searchStringTree = QP.fromNatural(searchText);
    return QP.toNatural(this._appendToTree(tree, searchStringTree));
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
