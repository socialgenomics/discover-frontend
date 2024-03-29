import Ember from 'ember';
// import QP from 'npm:@repositive/query-parser';
// import { task, timeout } from 'ember-concurrency';

// import ENV from 'repositive/config/environment';
import { getRandomElement } from 'repositive/utils/arrays';
// import { nameForKeyCode } from 'repositive/utils/key-codes';
// import { getCurrentNode, constructAutoCompleteTree } from 'repositive/utils/query-tree';

const { Component, get, inject: { service }, set, computed /*setProperties, Logger, $, isBlank*/ } = Ember;
// const ENDS_WITH_SPACE = /\s$/;

export default Component.extend({
  queryService: service('query'),
  ajax: service(),
  session: service(),

  classNames: ['c-search-bar'],

  openPagesPlaceholder: 'Search over 1 million human genomic datasets',

  isAuthenticated: computed.alias('session.isAuthenticated'),

  queryString: computed('queryService.queryString', {
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
      `Obesity microbiome`,
      `autism assay:RNA-Seq`,
      `infant stool assay:WGS`,
      `"Alzheimer's disease"`,
      `fetal epigenome`,
      `human populations "whole genome sequencing" WGS`,
      `hepatitis tissue:liver`
    ];

    set(this, 'placeholder', get(this, 'isAuthenticated') ?
      this._getSearchPlaceholder(placeholderValues) :
      get(this, 'openPagesPlaceholder')
    );
  },

  actions: {
    //Prevents the search field from clearing on blur
    // handleBlur() { return false; },

    // handleOpen(dropdown) {
    //   if (dropdown.resultsCount === 0) {
    //     return false;
    //   }
    // },

    // handleKeyDown(dropdown, e) {
    //   const keyName = nameForKeyCode(e.keyCode);
    //   const fetchSuggestionsTask = get(this, 'fetchSuggestions');

    //   if (keyName === 'Enter') { e.preventDefault(); }
    //   if (keyName === 'Enter' && dropdown.isOpen === false) {
    //     this.send('search');
    //   }

    //   if (keyName === 'Backspace' || keyName === 'Delete') {
    //     const caretPosition = this._getCaretPosition();
    //     const selectedText = window.getSelection().toString();
    //     const queryString = get(this, 'queryString');
    //     const ENTIRE_QUERY_SELECTED = selectedText.length === queryString.length;
    //     const ENTIRE_QUERY_DELETED = ENTIRE_QUERY_SELECTED && (keyName === 'Backspace' || keyName === 'Delete');
    //     const WILL_REMOVE_FIRST_CHAR =
    //       (keyName === 'Backspace' && caretPosition === 1 && !selectedText) ||
    //       (keyName === 'Delete' && caretPosition === 0 && !selectedText);

    //     if (ENTIRE_QUERY_DELETED) {
    //       get(this, 'queryService').setQueryTree(null);
    //       this._clearResults(dropdown);
    //     } else if (selectedText && queryString.indexOf(selectedText) === 0) {
    //       //HACK to prevent last letter in string from being deleted
    //       const newQuery = queryString.substring(selectedText.length) + '-';
    //       get(this, 'queryService').setQueryTree(QP.fromNatural(newQuery));
    //     } else if (WILL_REMOVE_FIRST_CHAR) {
    //       const newQuery = queryString.substring(1);
    //       if (isBlank(newQuery)) { fetchSuggestionsTask.cancelAll(); }
    //       get(this, 'queryService').setQueryTree(QP.fromNatural(newQuery));
    //     }
    //   }
    // },

    // handleSelection(selection, dropdown) {
    //   const queryTree = get(this, 'queryTree');

    //   if (selection) {
    //     const predicate = QP.predicate({ key: selection.groupName, value: selection.suggestionText });
    //     const caretPosition = this._getCaretPosition();
    //     const currentNode = getCurrentNode(queryTree, caretPosition);

    //     if (currentNode) {
    //       const newQueryTree = QP.replace({ on: queryTree, target: currentNode, replacement: predicate });
    //       get(this, 'queryService').setQueryTree(newQueryTree);
    //     } else {
    //       const newQueryTree = QP.and({left: predicate, right: queryTree});
    //       get(this, 'queryService').setQueryTree(newQueryTree);
    //     }
    //   }
    //   this._clearResults(dropdown);
    //   this.send('search');
    // },

    search() {
      const queryString = get(this, 'queryString');
      const performSearch = get(this, 'search');
      queryString ? performSearch(queryString) : performSearch();
    }
  },

  // /**
  //  * fetchSuggestions - Concurrently handles fetching of suggestions
  //  * @param {string} queryString - The text from the search input
  //  * @return {Promise} Promised suggestions
  //  */
  // fetchSuggestions: task(function * (queryString) {
  //   if (queryString.match(ENDS_WITH_SPACE)) { return false; }

  //   const DEBOUNCE_MS = 500;
  //   const caretPosition = this._getCaretPosition();
  //   const queryTree = QP.fromNatural(queryString);
  //   const currentNode = getCurrentNode(queryTree, caretPosition);

  //   if (currentNode) {
  //     const newTree = constructAutoCompleteTree(queryTree, currentNode);
  //     const requestData = {
  //       tree: newTree,
  //       limit: 3
  //     };
  //     const requestOptions = {
  //       method: 'POST',
  //       contentType: 'application/json',
  //       data: JSON.stringify(requestData)
  //     };

  //     get(this, 'queryService').setQueryTree(newTree);

  //     yield timeout(DEBOUNCE_MS);

  //     return get(this, 'ajax')
  //       .request(ENV.APIRoutes['autocomplete'], requestOptions)
  //       .then(this._handleAutocompleteSuccess.bind(this))
  //       .catch(Logger.error)
  //   }
  // }),
  // /**
  //  * _clearResults - Clears the loaded results and closes the dropdown
  //  * @param {Object} dropdown - The object representing the dropdown state
  //  */
  // _clearResults(dropdown) {
  //   setProperties(dropdown, {
  //     results: null,
  //     resultsCount: 0
  //   });
  //   dropdown.actions.close();
  // },

  // /**
  //  * _handleAutocompleteSuccess - Transforms response to array of suggestion objects
  //  * @param {Object} resp - The response of suggestions
  //  * @return {Array} Suggestion objects
  //  */
  // _handleAutocompleteSuccess(resp) {
  //   const suggestionKeys = Object.keys(resp) || [];

  //   return suggestionKeys
  //     .reduce((acc, groupName) => {
  //       const suggestions = resp[groupName];

  //       if (suggestions.length > 0) {
  //         const options = suggestions.map(suggestionText => {
  //           return { groupName, suggestionText };
  //         });

  //         return [...acc, ...[{ groupName: groupName.capitalize(), options }]];
  //       }

  //       return acc;
  //     }, []);
  // },

  // /**
  //  * _getCaretPosition - Get the caret position of the search input
  //  * @return {number} The index of the caret
  //  */
  // _getCaretPosition() {
  //   const cachedSearchSelector = get(this, 'cachedSearchSelector');
  //   if (!cachedSearchSelector) {
  //     const $searchBarSelector = $('.ember-power-select-typeahead-input')[0]
  //     set(this, 'cachedSearchSelector', $searchBarSelector);
  //     return $searchBarSelector.selectionStart || 0;
  //   }
  //   return cachedSearchSelector.selectionStart || 0;
  // },

  /**
   * @desc returns random search term placeholder
   * @returns {String}
   * @private
   */
  _getSearchPlaceholder(placeholderList) {
    return getRandomElement(placeholderList);
  }
});
