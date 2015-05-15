import Ember from 'ember';
import _ from 'npm:underscore';

export default Ember.Controller.extend({
  assays: function(){
    let properties = this.store.all('property');
    let assays = properties.getEach('assayType');
    return assays.uniq();
  }.property()
});
