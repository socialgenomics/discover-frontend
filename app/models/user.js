import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed, isPresent, get } = Ember;

export default Model.extend({
  createdAt: attr('isodate'),
  credentials: hasMany('credentials'),
  displayName: computed('username', 'firstname', 'lastname', function() {
    if (isPresent(get(this, 'firstname')) || isPresent(get(this, 'lastname'))) {
      const firstName = get(this, 'firstname') || '';
      const lastName = get(this, 'lastname') || '';
      return firstName + ' ' + lastName;
    } else {
      return 'User' + get(this, 'username');
    }
  }),
  firstname: attr('string'),
  isCurrentUser: attr('boolean', { defaultValue: false }), // checks the current authenticated user
  isEmailValidated: attr('boolean', { defaultValue: false }), // checks if email has been validated
  lastname: attr('string'),
  updatedAt: attr('isodate'),
  username: attr('string'),
  profile: attr('object'),
  userSetting: belongsTo('userSetting')
});
