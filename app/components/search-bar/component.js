import Ember from 'ember';
import QP from 'npm:@repositive/query-parser';
import { task, timeout } from 'ember-concurrency';

import ENV from 'repositive/config/environment';
import { getRandomElement } from 'repositive/utils/arrays';
import { nameForKeyCode } from 'repositive/utils/key-codes';
import {
  getCurrentNode,
  constructAutoCompleteArray,
  toNatural,
  applyAutoCompletion,
} from 'repositive/utils/query-array';
import { placeholderValues } from './placeholders';
import { predicates } from './predicates';

const { $, Component, get, inject: { service }, isBlank, set, setProperties, computed, Logger } = Ember;
const ENDS_WITH_SPACE = /\s$/;

export default Component.extend({
  queryService: service('query'),
  ajax: service(),
  session: service(),

  classNames: ['c-search-bar'],

  openPagesPlaceholder: 'Search over 1 million human genomic datasets',

  isAuthenticated: computed.alias('session.isAuthenticated'),
  hasPredicateOptions: computed.notEmpty('predicateOptions'),

  predicateOptions: computed('queryString', 'predicates', function() {
    const queryString = get(this, 'queryString') || '';
    return get(this, 'predicates')
      .filter(predicate => predicate.name.toLowerCase().includes(queryString.toLowerCase()));
  }),

  queryArray: computed('queryService.queryArray', function() {
    return get(this, 'queryService').getQueryArray();
  }),

  queryString: computed('queryArray', function() {
    return toNatural(get(this, 'queryArray'));
  }),

  // Only used by dropdown child components.
  extraArgs: computed('predicateOptions', 'hasPredicateOptions', function() {
    return {
      predicateOptions: get(this, 'predicateOptions'),
      hasPredicateOptions: get(this, 'hasPredicateOptions')
    }
  }),

  init() {
    this._super(...arguments);
    const placeholder = get(this, 'isAuthenticated') ?
      this._getSearchPlaceholder(placeholderValues) :
      get(this, 'openPagesPlaceholder');

    setProperties(this, { predicates, placeholder });
  },

  actions: {
    // Prevents the search field from clearing on blur
    handleBlur(dropdown) {
      this.send('handleClose', dropdown, null, 'blur');
      return false;
    },

    // Dropdown should only close on search and blur
    handleClose(dropdown, e, cause) {
      if (e !== null && e.type === 'mousedown') { return }
      if (cause === 'blur' || cause === 'search') {
        if (cause === 'search') {
          dropdown.actions.close();
        }
        return;
      } else { return false; }//Prevent close
    },

    handleKeyDown(dropdown, e) {
      const keyName = nameForKeyCode(e.keyCode);
      const fetchSuggestionsTask = get(this, 'fetchSuggestions');

      if (!dropdown.isOpen && keyName !== 'Enter') {
        dropdown.actions.open();
      }

      if (keyName === 'Enter') {
        e.preventDefault();
        if (dropdown.isActive && !dropdown.highlighted) {
          this.send('search');
          this.send('handleClose', dropdown, e, 'search');
        }
      }

      if (keyName === 'Backspace' || keyName === 'Delete') {
        const caretPosition = this._getCaretPosition();
        const selectedText = window.getSelection().toString();
        const queryString = get(this, 'queryString');
        const ENTIRE_QUERY_SELECTED = selectedText.length === queryString.length;
        const ENTIRE_QUERY_DELETED = ENTIRE_QUERY_SELECTED && (keyName === 'Backspace' || keyName === 'Delete');
        const WILL_REMOVE_FIRST_CHAR =
          (keyName === 'Backspace' && caretPosition === 1 && !selectedText) ||
          (keyName === 'Delete' && caretPosition === 0 && !selectedText);

        if (ENTIRE_QUERY_DELETED) {
          get(this, 'queryService').setQueryArray(null);
          set(dropdown, 'loading', false);
          this._clearResults(dropdown);
          fetchSuggestionsTask.cancelAll();
        } else if (selectedText && queryString.indexOf(selectedText) === 0) {
          //Hack to prevent last letter in string from being deleted
          const newQuery = queryString.substring(selectedText.length) + '-';
          get(this, 'queryService').setQueryArray(QP.fromPhrase(newQuery));
        } else if (WILL_REMOVE_FIRST_CHAR) {
          const newQuery = queryString.substring(1);
          get(this, 'queryService').setQueryArray(QP.fromPhrase(newQuery));
          if (isBlank(newQuery)) {
            set(dropdown, 'loading', false);
            this._clearResults(dropdown);
            fetchSuggestionsTask.cancelAll();
          }
        }
      }
    },

    handleFocus(dropdown) {
      dropdown.actions.open();
    },

    handleSelection(selection, dropdown) {
      console.log("SEL", selection, dropdown)
      const queryArray = get(this, 'queryArray');

      if (selection) {
        get(this, 'queryService').setQueryArray(applyAutoCompletion(queryArray, selection.text, selection.position));
      }
      this._clearResults(dropdown);
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
    if (queryString.match(ENDS_WITH_SPACE)) { return false; }

    const DEBOUNCE_MS = 500;
    const caretPosition = this._getCaretPosition();
    const queryArray = QP.fromPhrase(queryString);
    const newQueryArray = constructAutoCompleteArray(queryArray, caretPosition);

    if (newQueryArray) {
      const requestData = {
        query: newQueryArray,
        limit: 3
      };
      const requestOptions = {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestData)
      };

      get(this, 'queryService').setQueryArray(newQueryArray);

      yield timeout(DEBOUNCE_MS);

      return get(this, 'ajax')
        .request(ENV.APIRoutes['autocomplete'], requestOptions)
        .then(this._handleAutocompleteSuccess.bind(this))
        .catch(Logger.error)
    }
  }),
  /**
   * _clearResults - Clears the loaded results and closes the dropdown
   * @param {Object} dropdown - The object representing the dropdown state
   */
  _clearResults(dropdown) {
    setProperties(dropdown, {
      results: null,
      resultsCount: 0
    });
  },

  /**
   * _handleAutocompleteSuccess - Transforms response to array of suggestion objects
   * @param {Object} resp - The response of suggestions
   * @return {Array} Suggestion objects
   */
  _handleAutocompleteSuccess(resp) {
    return resp.suggestions || [];
  },

  /**
   * _getCaretPosition - Get the caret position of the search input
   * @return {number} The index of the caret
   */
  _getCaretPosition() {
    const cachedSearchSelector = get(this, 'cachedSearchSelector');
    if (!cachedSearchSelector) {
      const $searchBarSelector = $('.ember-power-select-typeahead-input')[0];
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
