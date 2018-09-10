import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'repositive/config/environment';
import RememberScrollMixin from 'repositive/mixins/remember-scroll';

const  { Route, RSVP, Logger, get, inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, RememberScrollMixin, {
  ajax: service(),

  model: function() {
    if (get(this, 'session.isAuthenticated')) {
      return RSVP.hash({
        stats: get(this, 'ajax').request(ENV.APIRoutes['stats'], { method: 'GET' }),
        datasources: get(this, 'ajax').request(ENV.APIRoutes['datasources'].replace('{limit}', 75), { method: 'GET' })
      }).catch(Logger.error);
    }
  }
});
