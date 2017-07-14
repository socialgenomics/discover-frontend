import Ember from 'ember';
import searchControllerMixin from 'repositive/mixins/search-controller';

const { Controller } = Ember;

export default Controller.extend(searchControllerMixin, {
  isRootRoute: window.location.pathname === '/'
});
