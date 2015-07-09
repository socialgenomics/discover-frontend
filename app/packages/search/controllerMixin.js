import Ember from 'ember';
import Filter from './filter';
import mappings from './mappings';
import _ from 'npm:underscore';

export default Ember.Mixin.create({

  _qpChanged: function(controller, _prop){
    this._super(controller, _prop);
    this.send('queryParamsDidChange');
  },

  actions: {

    addFilter: function(field, term){
      this.set(field, term) // change the query params
    },

    removeFilter: function(field, term){
      this.set(field, null)
    },

    queryParamsDidChange: function(){
      if (!Ember.isNone(this.get('model'))){
        var qps = _.object(this.get('queryParams').map(function(param){
          return [param, this.get(param)];
        }.bind(this)));
        this.set('model.queryParams', qps);
      }
    }.on('queryParamsDidChange'),

  }
});
