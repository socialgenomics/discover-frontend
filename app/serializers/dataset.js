import JSONSerializer from 'ember-data/serializers/json';
import DS from 'ember-data';
import Ember from 'ember';

export default JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    highlights: { embedded: 'always' }
  },
  keyForRelationship: function(key, kind, method)  {
    if (method === 'serialize') {
      //check that last 2 chars of key are not "Id" first
      if (key === 'actionableId') {
        return 'id';
      }
      const lastTwoCharsOfKey = key.slice(-2).toLowerCase();
      if (lastTwoCharsOfKey !== 'id' ) {
        return `${key}_id`;
      } else {
        return key.slice(0, -2) + '_id';
      }
    } else {
      let toReturn = Ember.String.underscore(key).toLowerCase();
      return toReturn;
    }
  },

  keyForAttribute: function(attr, method) {
    return Ember.String.underscore(attr).toLowerCase();
  }
});
