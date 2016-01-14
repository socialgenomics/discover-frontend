import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),
  avatar: null, // used by the navbar and comment components
  actions: {
    search: function(query) {
      this.transitionTo('datasets.search', {
        queryParams: {
          q: query,
          ordering: null,
          assayType: null,
          tags: null,
          repository: null,
          access: null
        }
      });
    },
    toggleModal() {
      this.controllerFor('application').toggleProperty('isShowingModal');
    },
    initAvatar: function() {
      this.store.query('profile', { UserId: this.get('session.data.authenticated.user.id') })
      .then((profiles) => {
        let controller = this.get('controller');
        controller.set('avatar', profiles.get('firstObject.avatar'));
      });
    }
  }
});
