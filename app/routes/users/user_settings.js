import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  model: function(params) {
    return this.store.query('user', { id: params.id }).then(users => {
      let user = users.get('firstObject');
      return new Ember.RSVP.all([
        this.store.query('userSetting', { user_id: user.get('id') })
      ])
      .then(values => {
        return {
          user: user,
          user_settings: values[0].get('firstObject')
        };
      });
    });
  }
});
