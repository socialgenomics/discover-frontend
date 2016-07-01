import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  main_email: attr('string'), // should only be availible for current user
  password_hash: attr(),
  username: attr('string'),
  firstname: attr('string'),
  lastname: attr('string'),
  credentials: hasMany('credentials'),
  datasets: hasMany('datasets'),
  comments: hasMany('comments'),
  user_profile: belongsTo('profile'),
  user_setting: belongsTo('setting'),
  createdAt: attr('isodate'),
  updatedAt: attr('isodate'),
  isCurrentUser: attr('boolean', { defaultValue: false }), // checks the current authenticated user
  isEmailValidated: attr('boolean', { defaultValue: false }), // checks if email has been validated
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
