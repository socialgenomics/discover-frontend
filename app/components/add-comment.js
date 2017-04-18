import Ember from 'ember';

const { Component, get, set, isEmpty, computed, inject: { service } } = Ember;

export default Component.extend({
  session: service(),

  isActive: false,
  isValid: false,
  classNames: 'u-flex u-items-start',
  classNameBindings: ['isActive:active'],
  allowComment: computed.and('isActive', 'session.isAuthenticated'),

  actions: {
    showButtons: function() {
      set(this, 'isActive', true);
    },
    cancel: function() {
      set(this, 'isActive', false);
      set(this, 'comment', null);
    },
    addComment() {
      //temporary validation
      if (!isEmpty(get(this, 'comment')) && get(this, 'allowComment')) {
        get(this, 'metrics').trackEvent({
          category: 'discover_homeauth_datasetDetail_comment',
          action: 'added comment',
          label: get(this, 'dataset.id')
        });
        get(this, 'addComment')(this.comment);
      }
      this.send('cancel');
    }
  }
});
