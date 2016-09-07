import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    // return this.store.findAll('collection');
    return [
      {
        id: 1,
        name: 'Chinese Control Data',
        description: 'Lots of text.',
        datasets: 25,
        views: 331
      },
      {
        id: 2,
        name: 'Another test collection',
        description: 'This is a test description for a test collection.',
        datasets: 2,
        views: 15
      }
    ];
  }
});
