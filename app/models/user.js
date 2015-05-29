import DS from "ember-data";

export default DS.Model.extend({
	email: DS.attr('string'),
	username: DS.attr('string'),
	firstname: DS.attr('string'),
	lastname: DS.attr('string'),
  isCurrentUser: DS.attr('boolean', {defaultValue: false}),
	comments: DS.hasMany('comments'),
  displayName: function(){
    if (Ember.isPresent(this.get('firstname')) || Ember.isPresent(this.get('lastname'))){
      return this.get('firstname') + ' ' + this.get('lastname')
    }
    else {
      return 'User' + this.get('username')
    }
  }.property('username', 'firstname', 'lastname')
});
