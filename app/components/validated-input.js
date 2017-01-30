import Ember from 'ember';

const { Component, computed, get, setProperties, set, isEmpty } = Ember;

export default Component.extend({
  errors: null,
  isActive: false,
  hasBeenFocused: false,
  classNames: ['u-mb3'],
  classNameBindings: ['isActive:active'],

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

    submitForm() { get(this, 'submit')(); },
    toggleMarkdownModal() { this.toggleProperty('isShowingMarkdownModal'); }
  }
});
