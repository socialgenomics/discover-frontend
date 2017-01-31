import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  model: function() {
    const userId = this.get('session.authenticatedUser.id');
    return this.store.findRecord('user', userId)
    .then(user => {
      return new Ember.RSVP.all([
        user,
        this.store.query('userSetting', { 'where.user_id': user.get('id') })
      ]);
    })
    .then(values => {
      return {
        user: values[0],
        settings: values[1].get('firstObject')
      };
    }).catch(err => {
      Ember.Logger.error(err);
    });
  }
});
