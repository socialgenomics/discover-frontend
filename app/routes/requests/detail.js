import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

//TODO move into mixin?
function peekOrCreate(store, id) {
  let existing = store.peekRecord('actionable', id);
  if (existing) {
    return existing;
  } else {
    return store.createRecord('actionable', { id: id });
  }
}

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    let actionable = peekOrCreate(this.store, params.id);
    return Ember.RSVP.all([
      this.store.query('action', {
        actionable_id: params.id
      }),
      this.store.findRecord('request', params.id)
    ])
    .then(data => {
      let request = data[1];
      actionable.set('actions', data[0]);
      request.actionableId = actionable;
      return request;
    }).catch(err => {
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
