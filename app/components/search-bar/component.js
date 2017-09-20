import Ember from 'ember';
import QP from 'npm:@repositive/query-parser';
import { task, timeout } from 'ember-concurrency';

import ENV from 'repositive/config/environment';
import { getRandomElement } from 'repositive/utils/arrays';
import { nameForKeyCode } from 'repositive/utils/key-codes';
import { getCurrentNode, constructAutoCompleteTree } from 'repositive/utils/query-tree';

const { $, Component, get, inject: { service }, set, computed, Logger } = Ember;

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

  extraArgs: computed('queryString', function() {
    return { queryString: get(this, 'queryString') }
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
      const keyName = nameForKeyCode(e.keyCode);

      if (keyName === 'Enter') { e.preventDefault(); }
      if (keyName === 'Enter' && dropdown.isOpen === false) {
        this.send('search');
      }

      // Reset queryTree when searchbox text is deleted
      if (keyName === 'Backspace' || keyName === 'Delete') {
        const caretPosition = this._getCaretPosition();
        const selectedText = window.getSelection().toString();
        const queryString = get(this, 'queryString');

        if ((keyName === 'Backspace' || keyName === 'Delete') && selectedText.length === queryString.length) {
          get(this, 'queryService').setQueryTree(null);
        } else if (selectedText && queryString.indexOf(selectedText) === 0) {
          //HACK to prevent last letter in string from being deleted
          const newQuery = queryString.substring(selectedText.length) + '-';
          get(this, 'queryService').setQueryTree(QP.fromNatural(newQuery));
        } else if (
          keyName === 'Backspace' && caretPosition === 1 && !selectedText ||
          keyName === 'Delete' && caretPosition === 0 && !selectedText
        ) {
          const newQuery = queryString.substring(1);
          get(this, 'queryService').setQueryTree(QP.fromNatural(newQuery));
        }
      }
    },

    handleFocus(dropdown) {
      dropdown.actions.open();
    },

    handleSelection(selection) {
      const queryTree = get(this, 'queryTree');

      if (selection) {
        const predicate = QP.predicate({ key: selection.groupName, value: selection.suggestionText });
        const caretPosition = this._getCaretPosition();
        const currentNode = getCurrentNode(queryTree, caretPosition);

        if (currentNode) {
          const newQueryTree = QP.replace({ on: queryTree, target: currentNode, replacement: predicate });
          get(this, 'queryService').setQueryTree(newQueryTree);
        } else {
          const newQueryTree = QP.and({left: predicate, right: queryTree});
          get(this, 'queryService').setQueryTree(newQueryTree);
        }
      }
      this.send('search');
    },

    search() {
      const queryString = get(this, 'queryString');
      const performSearch = get(this, 'search');
      queryString ? performSearch(queryString) : performSearch();
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
    const currentNode = getCurrentNode(queryTree, caretPosition);

    if (currentNode) {
      const newTree = constructAutoCompleteTree(queryTree, currentNode);
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
