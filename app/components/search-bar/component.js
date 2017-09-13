import Ember from 'ember';
import QP from 'npm:@repositive/query-parser';
import { task, timeout } from 'ember-concurrency';

import ENV from 'repositive/config/environment';
import { getRandomElement } from 'repositive/utils/arrays';

const { $, assign, Component, get, inject: { service }, set, computed, Logger } = Ember;

export default Component.extend({
  queryService: service('query'),
  ajax: service(),
  session: service(),

  classNames: ['c-search-bar'],

  openPagesPlaceholder: 'Search over 1 million human genomic datasets',

  isAuthenticated: computed.alias('session.isAuthenticated'),

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
    //Prevents the search field from clearing on blur
    handleBlur() { return false; },

    handleKeyDown(dropdown, e) {
      if (e.keyCode === 13) { e.preventDefault(); }
      if (e.keyCode === 13 && dropdown.isOpen === false) {
        this.send('search');
      }

      // Reset queryTree when searchbox text is deleted
      if (e.keyCode === 8 || e.keyCode === 46) {
        const caretPosition = this._getCaretPosition();
        const selectedText = window.getSelection().toString();

        if (e.keyCode === 8 && caretPosition === 1) {
          get(this, 'queryService').setQueryTree(null);
        } else if (e.keyCode === 46 && caretPosition === 0) {
          get(this, 'queryService').setQueryTree(null);
        } else if ((e.keyCode === 8 || e.keyCode === 46) && selectedText.length === QP.toNatural(get(this, 'queryTree')).length) {
          get(this, 'queryService').setQueryTree(null);
        }
      }
    },

    handleSelection(selection) {
      const queryTree = get(this, 'queryTree');

      if (selection) {
        const predicate = QP.predicate({ key: selection.groupName, value: selection.suggestionText });
        const caretPosition = this._getCaretPosition();
        const currentNode = this._getCurrentNode(queryTree, caretPosition);

        if (currentNode) {
          const newQueryTree = QP.replace({ on: queryTree, target: currentNode, replacement: predicate });
          get(this, 'queryService').setQueryTree(newQueryTree);
        } else {
          const newQueryTree = QP.and({left: predicate, right: queryTree});
          get(this, 'queryService').setQueryTree(newQueryTree);
        }
      } else {
        this.send('search');
      }
    },

    search() {
      const queryTree = get(this, 'queryTree');
      const performSearch = get(this, 'search');
      queryTree ? performSearch(QP.toNatural(queryTree)) : performSearch();
    }
  },

  /**
   * fetchSuggestions - Concurrently handles fetching of suggestions
   * @param {string} queryString - The text from the search input
   * @return {Promise} Promised suggestions
   */
  fetchSuggestions: task(function * (queryString) {
    const DEBOUNCE_MS = 500;
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
    const hackToken = QP.token('');
    const autocompleteNode = assign({ 'autocomplete': true }, currentNode, { _id: hackToken._id });

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
  _getCurrentNode(queryTree, caretPosition) {
    const treeWithPositions = QP.decorateTreeWithNaturalPositions(queryTree);
    return QP.filter(treeWithPositions, n => n.from <= caretPosition - 1 && n.to >= caretPosition - 1)[0];
  },

  /**
   * _getCaretPosition - Get the caret position of the search input
   * @return {number} The index of the caret
   */
  _getCaretPosition() {
    const cachedSearchSelector = get(this, 'cachedSearchSelector');
    if (!cachedSearchSelector) {
      const $searchBarSelector = $('.ember-power-select-typeahead-input')[0]
      set(this, 'cachedSearchSelector', $searchBarSelector);
      return $searchBarSelector.selectionStart || 0;
    }
    return cachedSearchSelector.selectionStart || 0;
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
