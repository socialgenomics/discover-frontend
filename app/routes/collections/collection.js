import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.findRecord('collection', params.id)
    .then(collection => {
      const collectionID = collection.get('id');
      return new Ember.RSVP.hash({
        collection: collection,
        //This would not work as there are multiple collection ids associated with each dataset
        datasets: this.store.query('dataset', { 'collection_id': collectionID })
      });
    })
    .then(values => {
      return {
        collection: values.collection,
        datasets: values.datasets
      };
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  }
});
