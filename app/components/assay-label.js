import Ember from 'ember';
import { getColours, getColour } from 'repositive.io/utils/colours';
import _ from 'npm:underscore';

export default Ember.Component.extend({
  tag: 'span',
  classNames: 'assay-small',
  classNameBindings: 'colour',
  attributeBindings: 'title',

  colour: function(){
    if (this.model){
      let assays = this.model.getEach('properties.assayType');
      assays = assays.uniq();
      let colours = getColours(assays.length);
      return colours[assays.indexOf(this.assay)]
    }
    else{
      return getColour(this.assay)
    }
  }.property('assay', 'model'),
  title: function(){
    return this.assay;       
  }.property('assay')
});
