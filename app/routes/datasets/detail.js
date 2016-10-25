import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
const { inject: { service }, Route, RSVP } = Ember;

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

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  favouritesService: service('favourites'),

  model: function(params) {
    let actionable = peekOrCreate(this.store, params.id);
    return RSVP.hash({
      comments: this.store.query('action', {
        'were.actionable_id': params.id,
        'where.type': 'comment',
        'order[0][0]': 'updated_at',
        'order[0][1]': 'DESC',
        limit: 100 // Remove limit to 10 elements
      }),
      tags: this.store.query('action', {
        'where.actionable_id': params.id,
        'where.type': 'tag'
      }),
      dataset: this.store.findRecord('dataset', params.id)
    })
    .then(data => {
      let dataset = data.dataset;
      dataset.set('actionableId', actionable);
      let commenterIds = data.comments.content
      .map(action => action.record.get('userId.id'))
      .reduce(reducer, []);
      return RSVP.hash({
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
    this.get('favouritesService').loadFavourites();
    let view = this.store.createRecord('action', {
      actionableId: currentModel.get('actionableId'),
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
