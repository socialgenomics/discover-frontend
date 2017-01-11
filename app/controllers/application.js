import Ember from 'ember';

const { Controller, inject: { service }, set } = Ember;

export default Controller.extend({
  session: service(),
  moment: service(),
  isRootRoute: function () {
    return window.location.pathname === '/'
  }.property('currentPath'),
  isShowingModal: false,

  actions: {
    toggleModal() {
      this.toggleProperty('isShowingModal');
    },

    changeDefaultFormat() {
      set(this, 'moment.defaultFormat', 'DD.MM.YYYY');
    }
  }
});
