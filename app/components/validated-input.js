import Ember from 'ember';

const { Component, computed, get, setProperties, set, isEmpty } = Ember;

export default Component.extend({
  errors: null,
  isActive: false,
  hasBeenFocused: false,
  classNames: ['u-mb3'],
  classNameBindings: ['isActive:active'],

  isValid: computed('hasBeenFocused', 'errors', 'formSubmitted', function() {
    return (get(this, 'hasBeenFocused') || get(this, 'formSubmitted')) && isEmpty(get(this, 'errors'));
  }),

  isInvalid: computed('hasBeenFocused', 'errors', 'formSubmitted', function() {
    return (get(this, 'hasBeenFocused') || get(this, 'formSubmitted')) && !isEmpty(get(this, 'errors'));
  }),

  actions: {
    focusedIn() { set(this, 'isActive', true); },

    focusedOut() {
      setProperties(this, {
        'hasBeenFocused': true,
        'isActive': false
      });
    },

    submitForm() { this.sendAction('submitForm'); },
    toggleMarkdownModal() { this.toggleProperty('isShowingMarkdownModal'); }
  }
});
