import DS from "ember-data";

var User = DS.Model.extend({
	email: DS.attr('string'),
	username: DS.attr('string'),
  isCurrentUser: DS.attr('boolean', {defaultValue: false})
});

export default User;
