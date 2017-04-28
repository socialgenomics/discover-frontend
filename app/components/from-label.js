import Ember from 'ember';

const { inject: { service }, Component, get } = Ember;

export default Component.extend({
  tagName: 'h6',
  classNames: ['fs0', 'u-fw-reg', 'mb2'],
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
