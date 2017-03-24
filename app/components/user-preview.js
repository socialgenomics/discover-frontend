import Ember from 'ember';

const { inject: { service }, Component, get, computed } = Ember;

export default Component.extend({
  session: service(),
  classNames: ['u-pos-relative', 'u-mb1', 'u-py2', 'u-pl1', 'u-hv-bc-darken5'],

  showCreateAccountModal: false,

  currentUser: computed('session.authenticatedUser.id', 'user.id', function() {
    return (get(this, 'session.authenticatedUser.id') === get(this, 'user.id'));
  }),

  actions: {
    toggleCreateAccountModal() {
      this.toggleProperty('showCreateAccountModal');
    }
  }
});
