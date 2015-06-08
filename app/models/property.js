import DS from "ember-data";

export default DS.Model.extend({
  dataset: DS.belongsTo('dataset'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  assayType: DS.attr('string'),
  downloadURL: DS.attr('string'),
  shortDescription: function(){
    let length = 100;
    let description = this.get('description');
    if (description.length > length){ 
      description = description.substr(0, length) + ' ..'; 
    }
    return description;
  }.property('description'),
});
