import Ember from 'ember';
const { inject: { service }, Component, get } = Ember;

export default Component.extend({
  tagName: 'h6',
  classNames: ['u-fs0','u-fw-reg', 'u-mb1'],
  session: service(),
  click() {
    if (get(this, 'session.isAuthenticated') === false) {
      this.send('toggleCreateAccountModal');
    }
  },
  actions: {
    toggleCreateAccountModal() {
      this.toggleProperty('showCreateAccountModal');
    }
  }
});
