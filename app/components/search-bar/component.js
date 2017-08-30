import Ember from 'ember';
import QP from 'npm:@repositive/query-parser';
import { task, timeout } from 'ember-concurrency';

import ENV from 'repositive/config/environment';
import { getRandomElement } from 'repositive/utils/arrays';

const { $, assign, Component, get, inject: { service }, isBlank, set, setProperties, computed, Logger } = Ember;

export default Component.extend({
  queryService: service('query'),
  ajax: service(),
  session: service(),

  classNames: ['c-search-bar'],

  openPagesPlaceholder: 'Search over 1 million human genomic datasets',

  isAuthenticated: computed.alias('session.isAuthenticated'),

  predicates: computed('queryTree.[]', function() {
    const queryTree = get(this, 'queryTree');
    const rawPredicates = queryTree ? QP.filter(queryTree, n => n._type === 'predicate') : [];
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
  //TODO set the initial state of queryString
  queryString: computed('queryTree.[]', 'queryService.queryString', function() {
    const queryTree = get(this, 'queryTree');
    //NOTE this will only return the first token. Refactor.
    const treeNoPreds = queryTree ? QP.filter(queryTree, node => node._type !== 'predicate')[0] : [];
    ////debugger;
    return QP.toNatural(treeNoPreds);
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

    setProperties(this, {
      //Could instead convert the queryService queryString to a tree then use it as the initial queryTree value
      'queryTree': null,
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
        const performSearch = get(this, 'search');
        //debugger;
        queryTree ? performSearch(QP.toNatural(queryTree)) : performSearch();
      }
    },

    handleSelection(selection, dropdown) {
      if (selection) {
        //When a predicate is selected remove the node with atocomplete true
        const predicate = QP.predicate({ key: selection.groupName, value: selection.suggestionText });
        const queryTree = get(this, 'queryTree');
        if (queryTree) {
          const nodeToRemove = QP.filter(queryTree, node => node.autocomplete === true)[0];

          const newQueryTree = QP.replace({on: queryTree, target: nodeToRemove, replacement: predicate })
          set(this, 'queryTree', newQueryTree);
        } else {
          set(this, 'queryTree', predicate);
        }

        //Reset the autocomplete component
        // TODO this is ineffective and causes double rendering bugs
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
    const caretPosition = this._getCaretPosition();

    const currentToken = queryString.substring(0, caretPosition);
    const tokenWithAutocomplete = assign({}, QP.token(currentToken), { 'autocomplete': true });
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

  //TODO: could be a computed prop to make it available to other funcs
  _getCaretPosition() {
    const inputField = $('.ember-power-select-typeahead-input')[0];

    return inputField.selectionStart || 0;
  },

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
    return queryTree ? QP.and({ left: queryTree, right: node }) : node;
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
