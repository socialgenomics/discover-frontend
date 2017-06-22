import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.query('dataset', {
      'order[0][0]': 'updated_at',
      'order[0][1]': 'DESC',
      limit: 120
    })
  }
});
