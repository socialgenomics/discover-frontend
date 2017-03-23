import Ember from 'ember';

const { inject: { service }, Component, get, computed } = Ember;

export default Component.extend({
  session: service(),
  classNames: ['u-pos-relative', 'u-py2', 'u-hv-bc-darken5'],

  currentUser: computed('session.authenticatedUser.id', 'user.id', function() {
    return (get(this, 'session.authenticatedUser.id') === get(this, 'user.id'));
  })
});
