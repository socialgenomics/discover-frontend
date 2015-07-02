import DS from "ember-data";
import moment from "npm:moment";


export default DS.Transform.extend({  
  from: function(serialized) {
    return Em.none(serialized) ? {} : serialized;
  },
  to: function(deserialized) {
    return Em.none(deserialized) ? {} : deserialized;
  }
});
