import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Mixin.create({

  _qpChanged: function(controller, _prop) {
    this._super(controller, _prop);
    this.send('queryParamsDidChange');
  },

  actions: {

    addFilter: function(field, term) {
      this.set(field, term); // change the query params
    },

    removeFilter: function(field /*term*/) {
      this.set(field, null); // set query param to null
    },

    queryParamsDidChange: function() {
      if (!Ember.isNone(this.get('model'))) {
        var qps = _.object(this.get('queryParams').map(function(param) {
          return [param, this.get(param)];
        }.bind(this)));
        this.set('model.queryParams', qps);
      }
    }.on('queryParamsDidChange')

  }
});
