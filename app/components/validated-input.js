import Ember from 'ember';

const { Component, computed, get, setProperties, set, isEmpty } = Ember;

export default Component.extend({
  errors: null,
  isActive: false,
  hasBeenFocused: false,
  showPassword: false,
  classNames: ['u-mb2', 'u-pos-relative'],
  classNameBindings: ['isActive:active', 'isTextarea:c-validated-textarea:c-validated-input'],

  isTextarea: computed('type', function() {
    return get(this, 'type') === 'textarea' ? true : false;
  }),

  isValid: computed('hasBeenFocused', 'errors', function() {
    return (get(this, 'hasBeenFocused')) && isEmpty(get(this, 'errors'));
  }),

  isInvalid: computed('hasBeenFocused', 'errors', function() {
    return (get(this, 'hasBeenFocused')) && !isEmpty(get(this, 'errors'));
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
      this.toggleProperty('showPassword');
      if (get(this, 'showPassword')) {
        set(this, 'type', 'text');
      } else {
        set(this, 'type', 'password');
      }
    },

    submitForm() { get(this, 'submit')(); }
  }
});
