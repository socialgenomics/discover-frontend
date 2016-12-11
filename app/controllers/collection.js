import Ember from 'ember';

const { Controller, set } = Ember;

export default Controller.extend({
  showMore: false,
  limit: 9,
  page: 1,
  queryParams: ['page', 'limit'],

  actions: {
    nextPage() {
      set(this, 'page', this.page + 1);
      this.send('invalidateModel');
    },
    previousPage() {
      set(this, 'page', this.page - 1);
      this.send('invalidateModel');
    },
    showMoreMeta() { this.toggleProperty('showMore'); }
  }
});
