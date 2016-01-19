import Ember from 'ember';

let { isEmpty } = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service(),
  avatar: Ember.computed.alias('session.data.authenticated.user.profile.avatar'),
  isActive: false,
  isValid: false,
  classNames: 'write-comment',
  classNameBindings: ['isActive:active'],
  comment: null,

  actions: {
    focusedIn: function() {
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
          category: 'dataset',
          action: 'comment',
          label: this.get('dataset.id')
        });
        this.sendAction('addComment', this.comment);
      }
      this.send('cancel');
    }
  }
});
