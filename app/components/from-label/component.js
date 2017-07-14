import Ember from 'ember';

const { inject: { service }, Component, get } = Ember;

export default Component.extend({
  session: service(),

  tagName: 'h6',
  classNames: ['fs0', 'fw-reg', 'mb2'],


  actions: {
    toggleCreateAccountModal() {
      this.toggleProperty('showCreateAccountModal');
    }
  },

  click() {
    if (get(this, 'session.isAuthenticated') === false) {
      this.send('toggleCreateAccountModal');
    }
  }
});
