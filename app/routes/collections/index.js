import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return this.store.query('collection', {
      'where.type.$ne': 'datasource',
      'offset': 0,
      'limit': 9
    });
  }
});
