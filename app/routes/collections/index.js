import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
const { Route, RSVP } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    if (this.get('session.isAuthenticated')) {
      const token = this.get('session.session.content.authenticated.token');
      const authHeaders = {
        authorization: `JWT ${token}`
      };
      return RSVP.hash({
        stats: ajax({ url: ENV.APIRoutes['stats'] , type: 'GET', headers: authHeaders }),
        collections: this.store.query('collection', {
          'where.type': 'repositive_collection',
          'order[0][0]': 'created_at',
          'order[0][1]': 'DESC',
          'offset': 0,
          'limit': 100
        })
      })
      .catch(err => {
        Ember.Logger.error(err);
        throw err;
      });
    }
  }
});
