import DS from 'ember-data';

var keyMappings = {
  'assayType': 'dataset.properties.assayType'
}

export default DS.Model.extend({
  name: DS.attr('string'),
  selected: DS.attr('boolean'),

  create(object){
    this.super(object)
    this.buckets = object.buckets;
    return this
  },
  serialize(){
    var field = keyMappings[field];
    return {
      field: term,
    }
  },
});
