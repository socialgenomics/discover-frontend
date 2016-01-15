import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),
  avatar: Ember.computed.alias('session.data.authenticated.user.profile.avatar'), // used by the navbar and comment components
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
    }
  }
});
