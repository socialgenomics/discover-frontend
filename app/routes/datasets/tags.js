import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.store.find('tag', { word: params.tag }).then(tags => {
        var tag = tags.get('firstObject');
        this.store.find('dataset', { relatedTag: tag.id }).then(datasets => {
          resolve(datasets);
        });
      });
    });
  }
});
