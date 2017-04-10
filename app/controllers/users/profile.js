import Ember from 'ember';

const { Controller, computed, get, getProperties } = Ember;

export default Controller.extend({
  user: computed.alias('model.user'),

  userProfileData: computed('user', function () {
    // TODO: maybe we should be more selective when it comes to userProfile data we are sending to component
    // there are properties in this object which should not be editable
    return getProperties(get(this, 'user'), 'firstname', 'lastname', 'profile');
  })
});
