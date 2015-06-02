import Ember from 'ember';

export default Ember.Controller.extend({

  requested: function(){
    var datasets = this.get('model.datasets');
    return datasets.filterBy('isRequest', true);
  }.property(),

  registered: function(){
    var datasets = this.get('model.datasets');
    return datasets.filterBy('isRequest', false);
  }.property(),

});
