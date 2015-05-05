import Ember from 'ember';
import _ from 'npm:underscore';

export default Ember.Route.extend({
  queryParams: {
    q: {
      refreshModel: true
    }
  },
  meta:{},
  model: function(params){
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax(
        {
          url:'/api/datasets/search',
          type:'POST',
          data:params
        })
        .then(function(resp){
        _this.meta = resp.meta;
        if (resp.meta.total > 0){
          //_this.store.pushPayload('Dataset', resp);
          var ids = resp.meta.ids;
          _this.store.find('dataset', {ids: ids}).then(function(datasets){
            resolve(datasets);
          });
        }
        else {
          return {}
        }
     //   _this.store.find(_.map(resp, function(r){ r.id })).then(resolve);
      },function(err){
        return console.log(err);
      });
    });
  },
  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('meta', this.meta)
  }
});
