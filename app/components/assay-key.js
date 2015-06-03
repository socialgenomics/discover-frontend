import Ember from 'ember';
import { getColours } from 'repositive.io/utils/colours';
import _ from 'npm:underscore';

export default Ember.Component.extend({
  tag: 'div',
  classNames: ['assay-key', 'right-of-container'],

  assays: function(){
    let assays = this.model.getEach('properties.assayType');
    assays = assays.uniq();
    let colours = getColours(assays.length);
    assays =  _.map(_.zip(assays, colours), function(tuple){
      return {name: tuple[0], colour:tuple[1]};
    });
    return assays
  }.property('model'),



});
