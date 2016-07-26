import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.findRecord('request', params.id)
    .then((requestObject) => {
      const userId = requestObject.belongsTo('userId').id();
      return Ember.RSVP.all([requestObject, this.store.findRecord('user', userId)]);
    })
    .then((data) => {
      return {
        request: data[0],
        user: data[1]
      };
    })
    .catch(err => {
      Ember.Logger.error(err);
    });
  },

  actions: {
    didTransition: function() {
      this.get('metrics').trackPage();
      return true;
    }
  }
});
