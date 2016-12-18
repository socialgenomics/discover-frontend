import Ember from 'ember';
import searchControllerMixin from '../mixins/search-controller';

const { Controller, set } = Ember;

export default Controller.extend(searchControllerMixin, {
  showMore: false,
  // limit: 9,
  // page: 1,
  // queryParams: ['page', 'limit'],

  actions: {
    // nextPage() {
    //   set(this, 'page', this.page + 1);
    //   this.send('invalidateModel');
    // },
    // previousPage() {
    //   set(this, 'page', this.page - 1);
    //   this.send('invalidateModel');
    // },
    showMoreMeta() { this.toggleProperty('showMore'); }
  }
});
