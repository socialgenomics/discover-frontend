import DS from "ember-data";

var KnownProperties = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
});

var Dataset = DS.Model.extend({
 // meta: DS.hasOne(KnownProperties, { embedded: true })
  body : DS.attr('string')
});

export default Dataset;
