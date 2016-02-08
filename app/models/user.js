import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  email: DS.attr('string'), // should only be availible for current user
  username: DS.attr('string'),
  firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  isCurrentUser: DS.attr('boolean', { defaultValue: false }),
  isEmailValidated: DS.attr('boolean', { defaultValue: false }),
  comments: DS.hasMany('comments'),
  createdAt: DS.attr('isodate'),
  updatedAt: DS.attr('isodate'),
  profile: DS.belongsTo('profile'),
  displayName: function() {
    if (Ember.isPresent(this.get('firstname')) || Ember.isPresent(this.get('lastname'))) {
      var fn = this.get('firstname') || '';
      var ln = this.get('lastname') || '';
      return fn + ' ' + ln;
    } else {
      return 'User' + this.get('username');
    }
  }.property('username', 'firstname', 'lastname')
});
