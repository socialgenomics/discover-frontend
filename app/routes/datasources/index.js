import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return this.store.query('collection', {
      'where.type': 'datasource',
      'order[0][0]': 'created_at',
      'order[0][1]': 'DESC',
      'offset': 0,
      'limit': 100
    });
  }
});
