import DS from "ember-data";

var Meta = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
});

var Metadata = DS.Model.extend({
  meta: DS.hasOne(Meta, { embedded: true })
});

export default Meta;
