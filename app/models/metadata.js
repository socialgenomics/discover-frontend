import DS from "ember-data";

var KnownProperties = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
});

var Metadata = DS.Model.extend({
 // meta: DS.hasOne(KnownProperties, { embedded: true })
  meta: DS.attr('string')
});

export default Metadata;
