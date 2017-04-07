import Ember from 'ember';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';

const { inject: { service }, Logger, Route, RSVP, get, set } = Ember;

export function mergeAssays(model, assaysFromUsers = []) {
  const assaysFromDataset = get(model, 'assay');
  const assaysFromProps = get(model, 'properties.attributes.assay');
  if (assaysFromProps) { return [...assaysFromProps, ...assaysFromUsers]; }
  if (assaysFromDataset) { return [...assaysFromDataset.split(','), ...assaysFromUsers]; }
  return assaysFromUsers;
}

export default Route.extend(ResetScrollMixin, LoadDetailRouteMixin, {
  session: service(),

  model(params, transition) {
    this._checkIfShouldUnfollow(params, transition, 'dataset');
    return this._getModelData(params, 'dataset')
      .then(data => {
        return RSVP.hash({
          attributes: this._getAttributes(params.id),
          dataset: data.model,
          stats: get(this, 'session.isAuthenticated') === false ? this._getStats() : null,
          tags: data.tags
        });
      })
        .then(hash => {
          const keywords = hash.tags.mapBy('properties.text');
          const dataset = hash.dataset;
          const userAssays = hash.attributes
            .filterBy('properties.key', 'assay')
            .mapBy('properties.value');
          const userIds = hash.attributes
            .mapBy('userId.id')
            .uniq();
          set(dataset, 'mergedAssays', mergeAssays(dataset, userAssays));
          return RSVP.hash({
            dataset: dataset,
            contributors: this._fetchUserData(userIds),
            stats: hash.stats,
            schema: this._buildSchemaObj(dataset, keywords)
          });
        })
        .catch(Logger.error);
  },

  afterModel(model) {
    this._incrementViewCounter(model.dataset, get(this, 'session.authenticatedUser'));
  },

  actions: {
    didTransition() {
      get(this, 'metrics').trackPage();
      return true;
    }
  },

  _buildSchemaObj(dataset, keywords) {
    const schemaObject = {
      '@context': 'http://schema.org/',
      '@type': 'Dataset',
      name: get(dataset, 'title'),
      description: get(dataset, 'description'),
      url: get(dataset, 'url'),
      keywords: keywords
    };
    return `<script type="application/ld+json">${JSON.stringify(schemaObject, 0, 2)}</script>`;
  },

  _fetchUserData(userIds) {
    return RSVP.all(
      userIds.reduce((queries, userId) => {
        return [...queries, ...[this.store.findRecord('user', userId)]];
      }, [])
    ).catch(Logger.error);
  }
});
