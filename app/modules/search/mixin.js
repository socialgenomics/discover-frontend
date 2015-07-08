import Ember from 'ember';
import Filter from './filter';
import mappings from './mappings';
import _ from 'npm:underscore';

export default Ember.Mixin.create({

  actions: {

    addFilter: function(field, term){
      this.set(field, term) // change the query params
      var qps = _.object(this.get('queryParams').map(function(param){
        return [param, this.get(param)];
      }.bind(this)));
      this.set('model.queryParams', qps);
    },

    removeFilter: function(field, term){
      this.set(field, null)
      var qps = _.object(this.get('queryParams').map(function(param){
        return [param, this.get(param)];
      }.bind(this)));
      this.set('model.queryParams', qps);
    },

  }
});
