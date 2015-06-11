import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  keyForRelationship: function(key, relationship, method) {
    return key[0].toUpperCase() + key.substr(1, key.length) + 'Id'
  },
});
