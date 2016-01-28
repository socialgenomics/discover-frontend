import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default ApplicationRouteMixin.reopen({
  sessionAuthenticated() {
    this._super(...arguments);
    // add the authed user to the read / write section of the session
    let userData = this.get('session.data.authenticated.user');
    let userId = userData.id;
    let profileId = userData.profileId;
    delete userData.id;
    delete userData.profileId;
    let jsonAPIUser = {
      data: {
        id: userId,
        type: 'user',
        attributes: userData,
        relationships: {
          profile: {
            data: {
              id: profileId,
              type: 'profile'
            }
          }
        }
      }
    };
    let authenticatedUser = this.store.push(jsonAPIUser);
    this.set('session.data.authenticatedUser', authenticatedUser);
  }
});
