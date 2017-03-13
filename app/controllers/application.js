import Ember from 'ember';

const { Controller, computed, inject: { service }, set } = Ember;

export default Controller.extend({
  session: service(),
  moment: service(),

  isRootRoute: computed('currentPath', function () {
    return window.location.pathname === '/' || window.location.pathname.indexOf('/users/') !== -1;
  }),

  actions: {
    changeDefaultFormat() { set(this, 'moment.defaultFormat', 'DD.MM.YYYY'); }
  }
});
