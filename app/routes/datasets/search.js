import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  model: function(params) {
    return this.store.createRecord('Search', {
      queryParams: params,
      user: this.get('session.authenticatedUser')
    });
  },
  actions: {
    willTransition: function() {
      this._resetController();
    }
  },

  _resetController: function() {
    this.controller.get('model').removeObserver('queryParams');
    this.controller.setProperties({
      q: null,
      ordering: null,
      assay: null,
      datasource: null,
      access: null
    });
  }
});
