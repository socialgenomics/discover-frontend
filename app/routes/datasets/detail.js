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

function reducer(acc, curr) {
  if (acc.indexOf(curr) === -1) {
    acc.push({ user_id: curr });
  }
  return acc;
}

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    let actionable = peekOrCreate(this.store, params.id);
    return Ember.RSVP.all([
      this.store.query('action', {
        actionable_id: params.id
      }),
      this.store.findRecord('dataset', params.id)
    ])
    .then(data => {
      let dataset = data[1];
      actionable.set('actions', data[0]);
      dataset.actionableId = actionable;
      let commenterIds = data[0].content
      .map(action => action.record.get('userId.id'))
      .reduce(reducer, []);
      return Ember.RSVP.hash({
        userProfiles: commenterIds.map(id => this.store.query('userProfile', id)),
        dataset: dataset
      });
    }).then((data) => {
      return data.dataset;
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
