import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';

const { get } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.findRecord('dataset', params.id);
  },
  afterModel: function() {
    /*
      check the url is still live, as a way of reporting errors.
     */
    let id = this.modelFor(this.routeName).get('id');
    let url = this.store.peekRecord('property', id).get('webURL');
    if (url) {
      ajax({ type: 'GET', url: url })
      .catch(err => {
        throw err;
      });
    }
  },
  actions: {
    didTransition: function() {
      this.get('metrics').trackPage();
      return true;
    }
  }

});
