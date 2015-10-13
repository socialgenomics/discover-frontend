import DS from "ember-data";

export default DS.Model.extend({
	email: DS.attr('string'),
	username: DS.attr('string'),
	firstname: DS.attr('string'),
	lastname: DS.attr('string'),
  isCurrentUser: DS.attr('boolean', {defaultValue: false}),
	comments: DS.hasMany('comments'),
	profile: DS.belongsTo('profile', {async: true}),
  displayName: function(){
    if (Ember.isPresent(this.get('firstname')) || Ember.isPresent(this.get('lastname'))){
      var fn = this.get('firstname') || '';
      var ln = this.get('lastname') || '';
      return  fn + ' ' + ln;
    }
    else {
      return 'User' + this.get('username')
    }
  }.property('username', 'firstname', 'lastname'),
});
