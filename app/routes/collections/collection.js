import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  // Fill out rest for datasets
  model: function(params) {
    return this.store.findRecord('collection', params.id)
    .then(collection => {
      const collectionId = source.get('id');
      return new Ember.RSVP.all([
        collection
      ]);
    })
    .then(values => {
      return {
        collection: values[0]
      };
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  }
});
