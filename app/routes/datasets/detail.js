import Ember from 'ember';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';

const { inject: { service }, Logger, Route, RSVP, get } = Ember;

export default Route.extend(ResetScrollMixin, LoadDetailRouteMixin, {
  session: service(),

  model(params) {
    const datasetId = params.id;
    const actionable = this._peekOrCreate(this.store, datasetId);
    return RSVP.hash({
      comments: this._getComments(datasetId),
      tags: this._getTags(datasetId),
      dataset: this.store.findRecord('dataset', datasetId)
    })
    .then(data => {
      const dataset = data.dataset;
      const commenterIds = data.comments.content
      .map(action => get(action, 'record.userId.id'))
      .reduce(this._removeDuplicates, []);
      dataset.set('actionableId', actionable);

      return RSVP.hash({
        dataset,
        userProfiles: commenterIds.map(id => this.store.query('userProfile', id))
      });
    })
    .then(data => {
      return RSVP.hash({
        dataset: data.dataset,
        stats: get(this, 'session.isAuthenticated') === false ? this._getStats() : null
      });
    })
    .catch(Logger.error);
  },

  afterModel(model) {
    this._logPageView(model.dataset);
  },

  actions: {
    didTransition() {
      get(this, 'metrics').trackPage();
      return true;
    }
  }
});
