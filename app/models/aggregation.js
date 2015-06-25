import DS from 'ember-data';

var keyMappings = {
  'assayType': 'dataset.properties.assayType'
}

export default DS.Model.extend({
  field: DS.attr('string'),
  term: DS.attr('string'),
  serialize(){
    var field = keyMappings[field];
    return {
      field: term,
    }
  }
});
