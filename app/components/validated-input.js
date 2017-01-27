import Ember from 'ember';

const { Component, computed, get, setProperties, isEmpty } = Ember;

export default Component.extend({
  errors: null,
  isActive: false,
  hasBeenFocused: false,
  classNames: ['u-mb3'],
  classNameBindings: ['isActive:active', 'showValid:valid', 'showInvalid:invalid'],

  showValid: computed('hasBeenFocused', 'errors', 'formSubmitted', function() {
    return (get(this, 'hasBeenFocused') || get(this, 'formSubmitted')) && isEmpty(get(this, 'errors'));
  }),

  showInvalid: computed('hasBeenFocused', 'errors', 'formSubmitted', function() {
    return (get(this, 'hasBeenFocused') || get(this, 'formSubmitted')) && !isEmpty(get(this, 'errors'));
  }),

  actions: {
    focusedIn() {
      setProperties(this, {
        'defaultPlaceholder': get(this, 'placeholder'),
        'placeholder': '',
        'isActive': true
      });
      this.sendAction();
    },

    focusedOut() {
      setProperties(this, {
        'placeholder': get(this, 'defaultPlaceholder'),
        'hasBeenFocused': true,
        'isActive': false
      });
    },

    submitForm() { this.sendAction('submitForm'); },
    toggleMarkdownModal() { this.toggleProperty('isShowingMarkdownModal'); }
  }
});
