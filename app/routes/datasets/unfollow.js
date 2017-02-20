import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { inject: { service }, Route, get, set, RSVP, Logger } = Ember;

export default Route.extend(AuthenticatedRouteMixin, FlashMessageMixin, {
  session: service(),

  model(params) {
    const userId = get(this, 'session.authenticatedUser.id');
    return this.store.query('subscription', {
      'where.user_id': userId,
      'where.subscribable_id': params.id
    })
    .then(() => {
      return set(this, 'subscription.active', false)
      .then(this._addFlashMessage('You have successfully unfollowed this dataset.', 'success'));
    })
    .catch(Logger.error);
  }
});
