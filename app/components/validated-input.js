import Ember from 'ember';

export default Ember.Component.extend({
  errors: null,
  isActive: false,
  hasBeenFocused: false,
  //formSubmitted: false,
  value: '',

  showValid: function() {
    return (this.get('hasBeenFocused') || this.get('formSubmitted')) && Ember.isEmpty(this.get('errors'));
  }.property('hasBeenFocused', 'errors', 'formSubmitted'),

  showInvalid: function() {
    return (this.get('hasBeenFocused') || this.get('formSubmitted')) && !Ember.isEmpty(this.get('errors'));
  }.property('hasBeenFocused', 'errors', 'formSubmitted'),

  //sets the class names of this component
  classNames: 'input-container',
  classNameBindings: ['isActive:active', 'showValid:valid', 'showInvalid:invalid'],

  actions: {
    toggleMarkdownModal() {
      this.toggleProperty('isShowingMarkdownModal');
    },

    focusedIn: function() {
      this.set('defaultPlaceholder', this.get('placeholder'));
      this.set('placeholder', '');
      this.set('isActive', true);
      this.sendAction();
    },
    focusedOut: function() {
      this.set('hasBeenFocused', true);
      this.set('placeholder', this.get('defaultPlaceholder'));
      this.set('isActive', false);
    },
    submitForm: function() {
      this.send('showInvalid');
      this.sendAction('submitForm');
    }
  }
});
