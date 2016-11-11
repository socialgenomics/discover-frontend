import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';
import DS from 'ember-data';

export default JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    userProfile: { embedded: 'always' }
  },
  keyForRelationship: function(key, kind, method) {
    if (method === 'serialize') {
      //check that last 2 chars of key are not "Id" first
      const lastTwoCharsOfKey = key.slice(-2).toLowerCase();
      if (lastTwoCharsOfKey !== 'id' ) {
        return `${key}_id`;
      } else {
        return key.slice(0, -2) + '_id';
      }
    } else {
      return Ember.String.underscore(key).toLowerCase();
    }
  },

  keyForAttribute: function(attr, method) {
    return Ember.String.underscore(attr).toLowerCase();
  }
});
