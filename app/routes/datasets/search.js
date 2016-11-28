import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service }, Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

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
