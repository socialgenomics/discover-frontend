import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  avatar: Ember.computed.alias('session.data.authenticated.user.profile.avatar')
});
