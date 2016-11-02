import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
const  { Route, RSVP, Logger, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    if (get(this, 'session.isAuthenticated')) {
      const token = get(this, 'session.session.content.authenticated.token');
      const authHeaders = {
        authorization: `JWT ${token}`
      };
      return RSVP.hash({
        stats: ajax({ url: ENV.APIRoutes['stats'] , type: 'GET', headers: authHeaders }),
        datasources: ajax({ url: ENV.APIRoutes['datasources'] , type: 'GET', headers: authHeaders })
      })
      .catch(err => {
        Logger.error(err);
      });
    }
  }
});
