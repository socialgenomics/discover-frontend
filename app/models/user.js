import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed, isPresent, get, getWithDefault } = Ember;

export default Model.extend({
  createdAt: attr('isodate'),
  firstname: attr('string'),
  verified: attr('boolean', { defaultValue: false }),
  lastname: attr('string'),
  profile: attr('object'),
  reputation: attr('object'),
  updatedAt: attr('isodate'),
  username: attr('string'),

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

  reputationTotal: computed('reputation', function() {
    const reputation = getWithDefault(this, 'reputation', {});
    return Object.keys(reputation)
      .reduce((sum, key) => sum + reputation[key], 0)
  })
});
