import DS from 'ember-data';
import Ember from 'ember'

export default DS.RESTSerializer.extend({
  keyForRelationship: function(key, kind, method)  {
    if (method === 'serialize') {
      let toReturn = `${key}_id`;
      return toReturn;
    }
    else {
      let toReturn = Ember.String.underscore(key).toLowerCase();
      return toReturn;
    }
    
  },
  keyForAttribute: function(attr, method) {
    return Ember.String.underscore(attr).toLowerCase();
  }
});
