import Ember from 'ember';

const { Component, computed, get, setProperties, set, isEmpty } = Ember;

export default Component.extend({
  errors: null,
  isActive: false,
  hasBeenFocused: false,
  isPasswordShown: false,
  classNames: ['c-validated-input', 'relative'],
  classNameBindings: ['isActive:active', 'isInvalid:invalid'],

  isValid: computed('hasBeenFocused', 'errors', function() {
    return (get(this, 'hasBeenFocused')) && isEmpty(get(this, 'errors'));
  }),

  isInvalid: computed('hasBeenFocused', 'errors', function() {
    return (get(this, 'hasBeenFocused')) && !isEmpty(get(this, 'errors'));
  }),

  inputType: computed('isPasswordShown', 'type', function() {
    if (get(this, 'type')) { return get(this, 'type'); }
    return get(this, 'isPasswordShown') ? 'text' : 'password';
  }),

  actions: {
    focusedIn() {
      set(this, 'isActive', true);
      if (get(this, 'showCommentButtons')) { get(this, 'showCommentButtons')(); }
    },

    focusedOut() {
      setProperties(this, {
        'hasBeenFocused': true,
        'isActive': false
      });
    },

    togglePasswordVisibility() {
      this.toggleProperty('isPasswordShown');
    }
  }
});
