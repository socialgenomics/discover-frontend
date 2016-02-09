import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.findRecord('dataset', params.id);
  },
  afterModel: function() {
    // model.get('comments').forEach((comment)=> {
    //   this.store.query('profile', { UserId: comment.get('UserId') });
    // });
  },
  actions: {
    didTransition: function() {
      this.get('metrics').trackPage();
      return true;
    }
  }

});
