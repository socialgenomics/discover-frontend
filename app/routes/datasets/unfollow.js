import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Route, Logger } = Ember;

export default Route.extend(AuthenticatedRouteMixin, FlashMessageMixin, {
  beforeModel() {
    return this._addFlashMessage('You have successfully unfollowed this dataset.', 'success');
  }
});
