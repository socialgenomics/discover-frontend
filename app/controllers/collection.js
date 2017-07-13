import Ember from 'ember';
import searchControllerMixin from 'repositive/mixins/search-controller';

const { Controller } = Ember;

export default Controller.extend(searchControllerMixin, {
  showMore: false,
  actions: {
    showMoreMeta() { this.toggleProperty('showMore'); }
  }
});
