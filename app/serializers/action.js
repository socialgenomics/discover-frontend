import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';
import DS from 'ember-data';
import { keyForAttribute, normalizeKeyName } from './application';

export default JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  keyForAttribute: keyForAttribute,
  keyForRelationship: function (key, kind, method) {
    if (method === 'serialize') {
      // if (key === 'actionableId' || key === 'subscribableId') {
      //   return 'id';
      // }
      normalizeKeyName(key);
    } else {
      return Ember.String.underscore(key).toLowerCase();
    }
  }
});
