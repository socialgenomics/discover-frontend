import Ember from 'ember';

export default Ember.Route.extend({
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
