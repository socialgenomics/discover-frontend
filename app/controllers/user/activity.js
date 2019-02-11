import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import computed from 'ember-macro-helpers/computed';

export default Controller.extend({
  session: service(),

  user: alias('model.user'),

  isOwnProfile: computed('model.user.id', 'session.authenticatedUser.id', function(profileUserId, sessionUserId) {
    if (sessionUserId === profileUserId) {
      return true;
    }
  }),

  pageTitleText: computed(
    "isOwnProfile",
    "user.data.firstname",
    (isOwnProfile, user) => `${isOwnProfile ? "Your" : `${user}'s`}`
  )
});
