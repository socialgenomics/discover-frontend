import Ember from 'ember';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';

const { inject: { service }, Logger, Route, RSVP, get, set } = Ember;

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
          set(dataset, 'userAssays', userAssays); // Can remove this
          return RSVP.hash({
            dataset: dataset,
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
  }
});
