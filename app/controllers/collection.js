import Ember from 'ember';
import searchControllerMixin from 'repositive/mixins/search-controller';
import RequestSubmissionMixin from 'repositive/mixins/request-submission';

const { Controller, inject: { service } } = Ember;

export default Controller.extend(searchControllerMixin, RequestSubmissionMixin, {
  session: service(),
  showMore: false,
  actions: {
    showMoreMeta() { this.toggleProperty('showMore'); }
  }
});
