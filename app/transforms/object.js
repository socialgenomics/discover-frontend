import DS from 'ember-data';
import Ember from 'ember';


export default DS.Transform.extend({
  from: function(serialized) {
    return Ember.none(serialized) ? {} : serialized;
  },
  to: function(deserialized) {
    return Ember.none(deserialized) ? {} : deserialized;
  }
});
