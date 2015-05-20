import Ember from "ember";

export default Ember.Route.extend({
  meta:null,
	model: function(params){
    console.log(params)
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax(
        {
          url:'/api/datasets/search',
          type:'POST',
          data:params
        })
        .then(function(resp){
        _this.set('meta', resp.meta);
        if (_this.meta.total > 0){
          delete resp.meta;
          _this.store.pushPayload('Dataset', resp);
          // Using `store.find('dataset', {ids: ids})` hits the backend.
          // use this instead..
          var datasets = _.map(resp.datasets, function(dataset){
            return _this.store.find('Dataset', dataset.id);
          });
          resolve(datasets)
        }
        else {
          resolve([])
        }
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
