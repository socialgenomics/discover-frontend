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
//This returns a list of user_ids, no duplicates.
function reducer(acc, curr) {
  if (acc.indexOf(curr) === -1) {
    acc.push({ user_id: curr });
  }
  return acc;
}

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  actionsService: Ember.inject.service('actions'),

  model: function(params) {
    let actionable = peekOrCreate(this.store, params.id);
    return Ember.RSVP.hash({
      comments: this.store.query('action', {
        actionable_id: params.id,
        type: 'comment'
      }),
      tags: this.store.query('action', {
        actionable_id: params.id,
        type: 'tag'
      }),
      dataset: this.store.findRecord('dataset', params.id)
    })
    .then(data => {
      let dataset = data.dataset;
      dataset.actionableId = actionable;
      let commenterIds = data.comments.content
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

  afterModel: function(dataset) {
    //TODO: Refactor - This code is used in several places e.g. request and dataset detail controllers & routes
    const userId = this.get('session.authenticatedUser');
    const currentModel = dataset;
    this.get('actionsService').updateFavourites();
    let view = this.store.createRecord('action', {
      actionableId: currentModel.actionableId,
      userId: userId,
      type: 'view',
      actionable_model: currentModel.constructor.modelName
    });
    view.save()
    .catch((err) => {
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
