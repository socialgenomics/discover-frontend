import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  session: service(),
  moment: service(),

  isRootRoute: computed('currentPath', function () {
    return window.location.pathname === '/' || window.location.pathname.indexOf('/users/') !== -1;
  })
});
