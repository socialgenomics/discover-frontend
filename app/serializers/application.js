import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';

export default JSONSerializer.extend({
  keyForRelationship: keyForRelationship,
  keyForAttribute: keyForAttribute
});

export function keyForRelationship(key, kind, method) {
  if (method === 'serialize') {
    if (key === 'actionableId' || key === 'subscribableId') {
      return 'id';
    }
    normalizeKeyName(key);
  } else {
    return Ember.String.underscore(key).toLowerCase();
  }
}

export function keyForAttribute(attr, method) {
  return Ember.String.underscore(attr).toLowerCase();
}

function normalizeKeyName(key) {
  if (key.slice(-2).toLowerCase() !== 'id' ) {
    return `${key}_id`;
  } else {
    return key.slice(0, -2) + '_id';
  }
}
