import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';
const { computed, isPresent, get } = Ember;
export default Model.extend({
  username: attr('string'),
  firstname: attr('string'),
  lastname: attr('string'),
  credentials: hasMany('credentials'),
  userProfile: belongsTo('userProfile'),
  userSetting: belongsTo('userSetting'),
  createdAt: attr('isodate'),
  updatedAt: attr('isodate'),
  isCurrentUser: attr('boolean', { defaultValue: false }), // checks the current authenticated user
  isEmailValidated: attr('boolean', { defaultValue: false }), // checks if email has been validated
  displayName: computed('username', 'firstname', 'lastname', function() {
    if (isPresent(get(this, 'firstname')) || isPresent(get(this, 'lastname'))) {
      const firstName = get(this, 'firstname') || '';
      const lastName = get(this, 'lastname') || '';
      return firstName + ' ' + lastName;
    } else {
      return 'User' + get(this, 'username');
    }
  })
});
