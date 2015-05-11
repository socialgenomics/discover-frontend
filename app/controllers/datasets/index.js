import Ember from 'ember';

export default Ember.Controller.extend({
  assays: function(){
    let properties = this.store.all('property');
    let assays = properties.getEach('sample technology');
    return assays.uniq();
  }.property()
});
