import Ember from 'ember';
import QP from 'npm:@repositive/query-parser';
import { task, timeout } from 'ember-concurrency';

import ENV from 'repositive/config/environment';
import { getRandomElement } from 'repositive/utils/arrays';

const { $, assign, Component, get, inject: { service }, isBlank, set, computed, Logger } = Ember;

export default Component.extend({
  queryService: service('query'),
  ajax: service(),
  session: service(),

  classNames: ['c-search-bar'],

  openPagesPlaceholder: 'Search over 1 million human genomic datasets',

  isAuthenticated: computed.alias('session.isAuthenticated'),

  // query: computed('queryService.queryString', {
  //   get() {
  //     return get(this, 'queryService').getQueryString();
  //   },
  //   set(key, value) {
  //     return value;
  //   }
  // }),

  queryTree: computed('queryService.queryTree', function() {
    return get(this, 'queryService').getQueryTree();
  }),

  queryString: computed('queryTree', function() {
    return QP.toNatural(get(this, 'queryTree'));
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

    set(this, 'placeholder', get(this, 'isAuthenticated') ?
      this._getSearchPlaceholder(placeholderValues) :
      get(this, 'openPagesPlaceholder')
    );
  },

  actions: {
    handleKeyDown(dropdown, e) {
      if (e.key === 'Enter') { e.preventDefault(); }
      if (e.key === 'Enter' && isBlank(dropdown.highlighted)) {
        const queryTree = get(this, 'queryTree');
        const performSearch = get(this, 'search');
        queryTree ? performSearch(QP.toNatural(queryTree)) : performSearch();
      }
    },

    handleSelection(selection /*, dropdown*/) {
      if (selection) {
        //When a predicate is selected remove the node with atocomplete true
        const predicate = QP.predicate({ key: selection.groupName, value: selection.suggestionText });
        const queryTree = get(this, 'queryTree');
        if (queryTree) {
          const nodeToRemove = QP.filter(queryTree, node => node.autocomplete === true)[0];
          const newQueryTree = QP.replace({on: queryTree, target: nodeToRemove, replacement: predicate })
          get(this, 'queryService').setQueryTree(newQueryTree);
        } else {
          get(this, 'queryService').setQueryTree(predicate);
        }

        //Reset the autocomplete component
        // TODO this is ineffective and causes double rendering bugs
        // setProperties(dropdown, {
        //   'searchText': null,
        //   'selected': null
        // });
      }
    }
  },

  /**
   * fetchSuggestions - Concurrently handles fetching of suggestions
   * @param {string} queryString - The text from the search input
   * @return {Promise} Promised suggestions
   */
  fetchSuggestions: task(function * (queryString) {
    const DEBOUNCE_MS = 250;
    const caretPosition = this._getCaretPosition();
    const queryTree = QP.fromNatural(queryString);
    const currentNode = this._getCurrentNode(queryTree, caretPosition);

    if (currentNode) {
      const newTree = this._constructAutoCompleteTree(queryTree, currentNode);
      const requestData = {
        tree: newTree,
        limit: 3
      };
      const requestOptions = {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestData)
      };

      get(this, 'queryService').setQueryTree(newTree);

      yield timeout(DEBOUNCE_MS);

      return get(this, 'ajax')
        .request(ENV.APIRoutes['autocomplete'], requestOptions)
        .then(this._handleAutocompleteSuccess.bind(this))
        .catch(Logger.error)
    }
  }),

  /**
   * _handleAutocompleteSuccess - Transforms response to array of suggestion objects
   * @param {Object} resp - The response of suggestions
   * @return {Array} Suggestion objects
   */
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
   * _constructAutoCompleteTree - Update the query tree with new autocomplete node
   * @param {node?} queryTree - The existing tree, with no autocomplete attrs
   * @param {node} currentNode - The node being edited
   * @return {node} New tree to send to suggestion endpoint
   */
  _constructAutoCompleteTree(queryTree, currentNode) {
    const autocompleteNode = assign({ 'autocomplete': true }, currentNode);

    return QP.replace({
      on: queryTree,
      target: currentNode,
      replacement: autocompleteNode
    });
  },

  /**
   * _getCurrentNode - Returns the node which this user is editting
   * @param {node} queryTree - The existing tree
   * @param {number} caretPosition - The position of the caret in search input
   * @return {node} The current node
   */
  _getCurrentNode(/*queryTree , caretPosition*/) {
    return false;
  },

  /**
   * _getCaretPosition - Get the caret position of the search input
   * @return {number} The index of the caret
   */
  _getCaretPosition() {
    const inputField = $('.ember-power-select-typeahead-input')[0];

    return inputField.selectionStart || 0;
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
