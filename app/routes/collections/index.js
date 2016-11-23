import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'repositive/config/environment';
import RememberScrollMixin from 'repositive/mixins/remember-scroll';

const { Route, RSVP, get, Logger, inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, RememberScrollMixin, {
  ajax: service(),
  model() {
    if (get(this, 'session.isAuthenticated')) {
      return RSVP.hash({
        stats: get(this, 'ajax').request(ENV.APIRoutes['stats'], { method: 'GET' }),
        collections: this.store.query('collection', {
          'where.type': 'repositive_collection',
          'order[0][0]': 'created_at',
          'order[0][1]': 'DESC',
          'offset': 0,
          'limit': 100
        })
      }).catch(Logger.error);
    }
  }
});
