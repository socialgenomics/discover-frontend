import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return new Ember.RSVP.Promise((resolve /* reject */) => {
      this.store.query('tag', { word: params.tag }).then(tags => {
        var tag = tags.get('firstObject');
        this.store.query('dataset', { relatedTag: tag.id }).then(datasets => {
          resolve(datasets);
        });
      });
    });
  }
});
