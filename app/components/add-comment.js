import Ember from 'ember';

const { Component, get, set, isEmpty } = Ember;

export default Component.extend({
  isActive: false,
  isValid: false,
  classNames: 'u-flex u-items-start',
  classNameBindings: ['isActive:active'],

  actions: {
    showButtons: function() {
      set(this, 'isActive', true);
    },
    cancel: function() {
      set(this, 'isActive', false);
      set(this, 'comment', null);
    },
    addComment: function() {
      //temporary validation
      if (!isEmpty(get(this, 'comment'))) {
        get(this, 'metrics').trackEvent({
          category: 'discover_homeauth_datasetDetail_comment',
          action: 'added comment',
          label: get(this, 'dataset.id')
        });
        this.attrs.addComment(this.comment);
      }
      this.send('cancel');
    }
  }
});
