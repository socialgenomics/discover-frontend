import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    var _this = this;
    //this.get('controller').set('tag', params.tag);
    return new Ember.RSVP.Promise(function(resolve, reject){
      _this.store.find('tag', {word: params.tag}).then(function(results){
        var tag = results.get('firstObject');
        _this.store.find('dataset', {relatedTag: tag.id}).then(function(results){
          resolve(results); 
        });
      });
    });
  }
});
