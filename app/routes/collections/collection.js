import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  // Fill out rest for datasets
  model: function(/* params */) {
    return [
      {
        id: 1,
        name: 'Chinese Control Data',
        description: 'China is rapidly growing in importance for the life sciences community. Not only is it becoming an important market, but as Chinese research grows, there is an increasing need for Chinese control data.',
        datasetsNo: 25,
        sourcesNo: 4,
        views: 331
      }
    ];
    // return this.store.findRecord('collection', params.id)
    // .then(collection => {
    //   const collectionId = source.get('id');
    //   return new Ember.RSVP.all([
    //     collection
    //   ]);
    // })
    // .then(values => {
    //   return {
    //     collection: values[0]
    //   };
    // })
    // .catch(err => {
    //   Ember.Logger.error(err);
    // });
  }
});
