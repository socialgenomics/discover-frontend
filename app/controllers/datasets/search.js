import Ember from 'ember';
import searchControllerMixin from 'repositive/mixins/search-controller';
import RequestSubmissionMixin from 'repositive/mixins/request-submission';

const { Controller } = Ember;

export default Controller.extend(searchControllerMixin, RequestSubmissionMixin, {
  isRootRoute: window.location.pathname === '/'
});
