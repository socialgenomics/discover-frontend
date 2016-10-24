import Ember from 'ember';
const { inject: { service }, Logger, Route, RSVP } = Ember;

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

export default Route.extend({
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
      Logger.error(err);
    });
  },

  afterModel(dataset) {
    //TODO: Refactor - This code is used in several places e.g. request and dataset detail controllers & routes
    const userId = this.get('session.authenticatedUser');

    if (userId) {
      this.get('favouritesService').loadFavourites();
      this.store.createRecord('action', {
        userId,
        actionableId: dataset.get('actionableId'),
        type: 'view',
        actionable_model: dataset.constructor.modelName
      })
        .save()
        .catch(Logger.error);
    }
  },

  actions: {
    didTransition: function() {
      this.get('metrics').trackPage();
      return true;
    }
  }
});
