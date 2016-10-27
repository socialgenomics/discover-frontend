import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
const  { Route, RSVP } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    if (this.get('session.isAuthenticated')) {
      let token = this.get('session.session.content.authenticated.token');
      let authHeaders = {
        authorization: `JWT ${token}`
      };
      return RSVP.all([
        ajax({ url: ENV.APIRoutes['stats'] , type: 'GET', headers: authHeaders }),
        ajax({ url: ENV.APIRoutes['datasources'] , type: 'GET', headers: authHeaders }),
      ])
      .then(data => {
        return {
          stats: data[0],
          datasources: data[1]
        };
      })
      .catch(err => {
        Ember.Logger.error(err);
        throw err;
      });
    }
  }
});
