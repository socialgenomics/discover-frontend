import Ember from 'ember';

const { Controller, inject: { service }, set } = Ember;

export default Controller.extend({
  session: service(),
  moment: service(),

  // queryParams: ['query'],
  // query: null,
  isShowingModal: false,

  actions: {
    toggleModal() {
      this.toggleProperty('isShowingModal');
    },

    changeDefaultFormat() {
      set(this, 'moment.defaultFormat', 'DD.MM.YYYY');
    },

    search(query) {
      set(this, 'query', query.trim());
    }
  }
});
