import Ember from 'ember';

export default Ember.Controller.extend({
  cards: function(){
    let datasets = this.get('model.datasets');
    if (datasets) { return datasets.splice(0,3) }
    else { return [] }
  }.property('model.datasets')
});
