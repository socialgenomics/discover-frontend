import Ember from 'ember';

const { computed, Component, inject: { service }, get, set } = Ember;

export default Component.extend({
  session: service(),
  icon: computed('flash.type', function() {
    if (get(this, 'flash.type') === 'success') { return 'check-circle-o'; }
    if (get(this, 'flash.type') === 'warning') { return 'exclamation-circle '; }
    if (get(this, 'flash.type') === 'info') { return 'lightbulb-o'; }
  }),
  actions: {
    closeMessages() {
      get(this, 'flashMessages').clearMessages();
      set(this, 'session.data.displayWelcomeMessage', false);
    }
  }
});
