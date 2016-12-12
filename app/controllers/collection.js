import Ember from 'ember';
import searchControllerMixin from '../mixins/search-controller';

const { Controller } = Ember;

export default Controller.extend(searchControllerMixin, {
  showMore: false,
  limit: 9,
  page: 1,
  queryParams: ['page', 'limit'],

  actions: {
    nextPage() {
      this.set('page', this.page + 1);
      this.send('invalidateModel');
    },
    previousPage() {
      this.set('page', this.page - 1);
      this.send('invalidateModel');
    },
    showMoreMeta() {
      this.toggleProperty('showMore');
    }
  }
});
