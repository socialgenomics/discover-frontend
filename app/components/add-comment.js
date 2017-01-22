import Ember from 'ember';

let { isEmpty } = Ember;

export default Ember.Component.extend({
  isActive: false,
  isValid: false,
  classNames: 'write-comment',
  classNameBindings: ['isActive:active'],

  actions: {
    showButtons: function() {
      this.set('isActive', true);
    },
    cancel: function() {
      this.set('isActive', false);
      this.set('comment', null);
    },
    addComment: function() {
      //temporary validation
      if (!isEmpty(this.get('comment'))) {
        this.get('metrics').trackEvent({
          category: 'discover_homeauth_datasetDetail_comment',
          action: 'added comment',
          label: this.get('dataset.id')
        });
        this.attrs.addComment(this.comment);
      }
      this.send('cancel');
    }
  }
});
